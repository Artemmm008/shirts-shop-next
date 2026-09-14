import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hasSession = request.cookies.has("accessToken") || request.cookies.has("refreshToken");
    const userRole = request.cookies.get("role")?.value;

    if (pathname.startsWith('/admin')) {
        if (!hasSession) {
           return NextResponse.redirect(new URL("/sign-in", request.url))
        };

        if (userRole && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    };

    return NextResponse.next();
};

export const config = {
    matcher: ['/admin/:path*'],
};