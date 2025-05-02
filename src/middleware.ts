import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;

    console.log('token', token);
    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            Cookie: `access_token=${token}`,
        },
    });

    if (!res.ok) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    const user = await res.json();

    if (/^\/admin(\/|$)/.test(req.nextUrl.pathname) && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
