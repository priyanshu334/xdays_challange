import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function getCurrentUser() {

    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value

    if (!token) return null

    const decoded = verifyToken(token) as { userId: string }

    if (!decoded) return null

    return decoded
}