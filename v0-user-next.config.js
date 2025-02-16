/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname)
    return config
  },
}

module.exports = nextConfig

