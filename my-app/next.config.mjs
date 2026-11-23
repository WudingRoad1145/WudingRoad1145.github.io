/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/about", destination: "/#my-world", permanent: true }];
  },
};

export default nextConfig;
