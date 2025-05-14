/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const baseUrl =
            process.env.STATE === 'DEV'
                ? 'http://localhost:4200'
                : 'https://sleep-backend-0048.onrender.com'

        return [
            {
                source: '/:path((?!(?:_next|favicon\\.ico|.*\\..*|articles(?:/.*)?|test(?:/.*|$)|consultations(?:/.*|$))).*)',
                destination: `${baseUrl}/:path`,
            },
        ]
    },
}

export default nextConfig
