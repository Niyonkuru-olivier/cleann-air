import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Tell Next.js NOT to bundle these NestJS server-side packages.
  // They will be required at runtime from node_modules instead.
  serverExternalPackages: [
    "@nestjs/core",
    "@nestjs/common",
    "@nestjs/platform-express",
    "@nestjs/config",
    "@prisma/client",
    "prisma",
    "bcryptjs",
    "nodemailer",
    "reflect-metadata",
    "express",
    "class-transformer",
    "class-validator",
  ],
};

export default nextConfig;
