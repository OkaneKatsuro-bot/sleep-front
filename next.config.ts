// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // Любые запросы, начинающиеся не с _next, не к favicon.ico и не к файлам с расширением
                source: '/:path((?!_next|favicon\\.ico|.*\\..*).*)',
                destination: 'https://sleep-backend-0048.onrender.com/:path',
            },
        ]
    },
}

export default nextConfig
