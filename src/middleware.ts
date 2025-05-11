import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
    // 1) Получаем токен из куки asleep.online
    const token = req.cookies.get('access_token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // 2) Обращаемся к профилю через прокси-rewrite
    const profileRes = await fetch(
        `${req.nextUrl.origin}/auth/profile`,
        {
            method: 'GET',
            headers: {
                // вручную передаём куки бекенду
                Cookie: `access_token=${token}`,
            },
        }
    );

    if (!profileRes.ok) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    const user = await profileRes.json();

    // 3) Проверяем роуты /admin и роль
    if (req.nextUrl.pathname.startsWith('/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Всё ок — пропускаем дальше
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],  // срабатывает только на /admin/*
};
