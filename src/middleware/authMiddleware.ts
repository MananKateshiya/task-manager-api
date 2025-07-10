import { NextFunction, Request, Response } from "express";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

interface AuthRequestType extends Request {
    user?: string | JWTPayload
}

async function authMiddleware(req: AuthRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("Token", token);

    if (!token) {
        return res.status(401).json({ error: "Access Denied - Access Token Required" })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    try {
        const verified = jwtVerify(token, secret);
        req.user = verified;
        next()
    } catch (error) {

    }

}