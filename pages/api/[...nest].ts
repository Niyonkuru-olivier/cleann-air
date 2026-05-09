import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../backend/src/app.module';

let cachedHandler: any;

export default async function handler(req: any, res: any) {
  if (!cachedHandler) {
    try {
      // Let NestJS create the Express instance automatically
      const app = await NestFactory.create(AppModule, { logger: false });
      
      app.enableCors({
        origin: true,
        credentials: true,
      });

      app.setGlobalPrefix('api');
      await app.init();
      
      // Get the underlying express instance
      cachedHandler = app.getHttpAdapter().getInstance();
    } catch (err: any) {
      console.error('NestJS Initialization Error:', err);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error during NestJS initialization',
        error: err.message,
      });
    }
  }

  try {
    // Handle the request
    return cachedHandler(req, res);
  } catch (err: any) {
    console.error('NestJS Request Error:', err);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error during request handling',
      error: err.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true, // Tell Next.js that the request is handled externally
  },
};
