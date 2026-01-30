/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimizaciones para producción
    reactStrictMode: true,
    
    // Configuración de imágenes si es necesario
    images: {
        remotePatterns: [],
    },
    
    // Variables de entorno expuestas al cliente
    env: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    },
};

export default nextConfig;
