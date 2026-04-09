import jwt, { JwtPayload } from "jsonwebtoken"

export function signToken(payload: string | object | Buffer) {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error("JWT_SECRET is not set")
    }
    return jwt.sign(payload, secret, {
        expiresIn: "7d"
    })
}

/** Returns null if the token is missing, invalid, expired, or signed with a different secret. */
export function verifyToken(token: string): { userId: string } | null {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        return null
    }
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload & { userId?: unknown }
        if (typeof decoded.userId !== "string") {
            return null
        }
        return { userId: decoded.userId }
    } catch {
        return null
    }
}