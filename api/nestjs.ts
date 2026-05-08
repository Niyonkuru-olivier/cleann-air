import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../backend/src/app.module';
import express from 'express';
import type { Request, Response } from 'express';

// Singleton for cold-start performance
let cachedApp: express.Express | null = null;

async function createNestApp(): Promise<express.Express> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  // No logger to avoid spamming Vercel logs
  const app = await NestFactory.create(AppModule, adapter, { logger: false });

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  // NestJS global prefix should match main.ts
  app.setGlobalPrefix('api');

  await app.init();
  cachedApp = expressApp;
  return cachedApp;
}

export default async function handler(req: Request, res: Response) {
  const app = await createNestApp();
  // Bridge the request to NestJS
  app(req, res);
}
