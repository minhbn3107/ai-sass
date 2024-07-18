/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "oaidalleapiprodscus.blob.core.windows.net",
            },
            {
                protocol: "https",
                hostname: "replicate.delivery",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "ai-studio-assets.limewire.media",
            },
        ],
    },
};

export default nextConfig;
