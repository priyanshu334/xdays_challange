import { db } from "@/db";
import { users } from "@/db/schemas";
import { signToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import z from "zod";

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const data = LoginSchema.parse(body)

        const existingUser = await db.select().from(users).where(eq(users.email, data.email))
        if (!existingUser[0]) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        const isValidPasswrod = await verifyPassword(data.password, existingUser[0].password)
        if (!isValidPasswrod) {
            return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 })
        }

        const token = signToken({ userId: existingUser[0].id })
        const response = NextResponse.json({ success: true })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })
        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }

}