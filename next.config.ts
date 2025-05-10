import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',                            // любой запрос на /api/*
                destination: 'https://sleep-backend-0048.onrender.com/:path*',  // перенаправить на ваш бек
            },
        ]
    },
};

export default nextConfig;
