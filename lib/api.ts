/**
 * Returns the base API URL for all frontend fetch calls.
 *
 * - In Client Components: uses a relative path `/api` in production
 *   to avoid CORS issues and leverage Vercel rewrites.
 * - In Server Components (SSR/RSC): uses the full VERCEL_URL to
 *   ensure absolute fetch calls succeed during SSR.
 * - In local development: defaults to localhost:3001.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" ? "http://localhost:3001/api" : "/api")
    : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : "http://localhost:3001/api"));
