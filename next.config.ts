/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
}

module.exports = nextConfig