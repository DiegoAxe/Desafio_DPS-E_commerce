import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /* Configuracion para que acepte las imagenes procedientes de Amazon */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
