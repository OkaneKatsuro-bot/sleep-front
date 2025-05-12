/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const baseUrl =
            process.env.STATE === 'DEV'
                ? 'http://localhost:4200'
                : 'https://sleep-backend-0048.onrender.com'

        return [
            {
                // любое вхождение /что-то (кроме _next, favicon, static-файлов)
                source: '/:path((?!(?:_next|favicon\\.ico|.*\\..*|articles(?:/.*)?)).*)',
                // переписываем на бэкенд так, чтобы “path” пошёл в URL
                destination: `${baseUrl}/:path`,
            },
        ]
    },
}

export default nextConfig

