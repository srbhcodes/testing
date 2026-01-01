/** @type {import('next').NextConfig} */
const nextConfig = {
  // 7.5: Optimize images - Configure domains for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image loading
    deviceSizes: [320, 420, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128],
  },
  
  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-tooltip', '@radix-ui/react-popover', '@radix-ui/react-dialog'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
