// GitHub Pages serves project sites under /<repo>, so any URL we build by hand
// (as opposed to letting <Link>/next handle it) must be prefixed. Next injects
// the same value it uses for basePath here via next.config.mjs `env`.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a root-relative asset path (e.g. an <img src>) with the base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
