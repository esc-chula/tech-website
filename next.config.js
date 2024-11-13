/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  // config next/image to beable to src img from url link
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default config;
