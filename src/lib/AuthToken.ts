import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from "jose";

const encodedKey = new TextEncoder().encode(`${process.env.JWT_SECRET}`);


export async function generateAuthToken(payload: { userId: string, userRole: string}) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encodedKey)
}

export async function decryptAuthToken(token: string)  {
    try {
        const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
        return payload;
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}