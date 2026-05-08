import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.init();
  return server;
};

export default async (req: any, res: any) => {
  const app = await createServer();
  app(req, res);
};
