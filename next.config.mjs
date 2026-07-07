/** @type {import('next').NextConfig} */

// On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
// so assets must be prefixed with that sub-path. The CI workflow injects it via
// NEXT_PUBLIC_BASE_PATH (from the configure-pages action). Locally it's empty, so
// `pnpm dev` and `pnpm build` serve from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  // Emit a fully static site into ./out — no Node server needed to host it.
  output: 'export',
  // next/image optimization needs a server; static export can't use it.
  images: { unoptimized: true },
  // Serve /about as /about/index.html so GitHub Pages resolves clean URLs.
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
