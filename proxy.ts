import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    '/cart',
    '/checkout',
    '/allorders',
    '/whishlist'
]

const authRoutes = [
    '/login',
    '/register',
    '/forgotPassword',
    '/resetPassword',
    '/verifyResetCode'
]

export function proxy(request: NextRequest){
    const {pathname} = request.nextUrl
    const token = request.cookies.get('token')?.value || null

    const isAuthinticated = !!token

    const isProtectedRoute = protectedRoutes.some((route)=> pathname === route || pathname.startsWith(`${route}/`))

    if(!isAuthinticated && isProtectedRoute){
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    const isAuthRoute = authRoutes.some((route)=> pathname === route || pathname.startsWith(`${route}/`))

    if(isAuthinticated && isAuthRoute){
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher:[
    '/cart/:path*',
    '/checkout/:path*',
    '/allorders/:path*',
    '/whishlist/:path*',
    '/login',
    '/register',
    '/forgotPassword',
    '/resetPassword',
    '/verifyResetCode'
    ]
}