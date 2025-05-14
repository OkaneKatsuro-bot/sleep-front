/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assets.aceternity.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.yandexcloud.net",
                pathname: "/**",
            },
        ],// Добавьте сюда ваш домен для загрузки изображений
    },
    async rewrites() {
        const baseUrl =
            process.env.STATE === 'DEV'
                ? 'http://localhost:4200'
                : 'https://sleep-backend-0048.onrender.com'

        return [
            {
                source: '/:path((?!(?:_next|favicon\\.ico|.*\\..*|articles(?:/.*)?|test(?:/.*|$)|consultations(?:/.*|$)|shop(?:/.*))).*)',
                destination: `${baseUrl}/:path`,
            },
        ]
    },
}

export default nextConfig
