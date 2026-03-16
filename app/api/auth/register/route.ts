import { db } from "@/db";
import { users } from "@/db/schemas";
import { signToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { NextResponse } from "next/server";
import z from "zod"
const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export async function POST(req: Request) {
    const body = await req.json();
    const data = signupSchema.parse(body);
    const { name, email, password } = data;

    try {
        const hashedPassword = await hashPassword(password);
        const user = await db.insert(users).values({
            name,
            email,
            password: hashedPassword
        }).returning()

        const token = signToken({ userId: user[0].id })
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