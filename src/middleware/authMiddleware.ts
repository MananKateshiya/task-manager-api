import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTVerifyResult } from "jose";

interface AuthRequestType extends Request {
    user?: string | JWTVerifyResult
}

async function authMiddleware(req: AuthRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token", token);

    if (!token) {
        return res.status(401).json({ error: "Access Denied - Access Token Required" })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    try {
        const verified = await jwtVerify(token, secret);
        req.user = verified;
        next();
    } catch (error: any) {
        res.status(401).json({ message: "Invalid Token", error: error.message })
    }

}

export default authMiddleware