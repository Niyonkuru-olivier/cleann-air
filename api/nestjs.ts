import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../backend/src/app.module';
import express from 'express';
import type { Request, Response } from 'express';

let cachedApp: express.Express | null = null;

async function createNestApp(): Promise<express.Express> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, { logger: false });

  // CORS: allow the Vercel deployment and localhost
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  // Set global prefix to 'api' to match how NestJS is configured in main.ts
  // Vercel routes /api/* → this function, forwarding the full path
  app.setGlobalPrefix('api');

  await app.init();
  cachedApp = expressApp;
  return cachedApp;
}

export default async function handler(req: Request, res: Response) {
  const app = await createNestApp();
  app(req, res);
}
