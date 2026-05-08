/**
 * Returns the base API URL for all frontend fetch calls.
 *
 * - In production (Vercel): uses a relative path `/api` so calls stay
 *   on the same domain and are routed to the NestJS serverless function
 *   via the vercel.json rewrite rules.
 * - In local dev: falls back to `http://localhost:3001/api` so the
 *   separately-running NestJS server is still reachable.
 *
 * Override by setting NEXT_PUBLIC_API_URL in your environment.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "/api"
    : "http://localhost:3001/api");
