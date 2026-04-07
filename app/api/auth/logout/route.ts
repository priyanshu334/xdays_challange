import { NextResponse } from "next/server"

export async function POST() {
    const res = NextResponse.json({ success: true })
    res.cookies.set("token", "", {
        expires: new Date(0),
        path: "/"
    })
    return res
}

export async function GET(req: Request) {
    const res = NextResponse.redirect(new URL("/", req.url))
    res.cookies.set("token", "", {
        expires: new Date(0),
        path: "/"
    })
    return res
}