import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../backend/src/app.module';
import express from 'express';
import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const app = await createNestApp();
    // Bridge the request to NestJS
    // Express app is a function that takes (req, res)
    // @ts-ignore - NextApiRequest/Response are compatible enough with Express
    app(req, res);
  } catch (err: any) {
    console.error('NestJS Bridge Error:', err);
    res.status(500).json({ 
      statusCode: 500, 
      message: 'Internal Server Error', 
      error: err.message 
    });
  }
}

// Disable Next.js body parsing so NestJS can handle it (important for file uploads, etc.)
export const config = {
  api: {
    bodyParser: false,
  },
};
