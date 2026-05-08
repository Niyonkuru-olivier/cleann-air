import 'reflect-metadata';
import { type NextRequest } from 'next/server';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../../backend/src/app.module';
import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── NestJS singleton (warm between invocations) ────────────────────────────
let cachedApp: express.Express | null = null;

async function getNestApp(): Promise<express.Express> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, { logger: false });

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  // Match the global prefix set in backend/src/main.ts
  app.setGlobalPrefix('api');
  await app.init();

  cachedApp = expressApp;
  return cachedApp;
}

// ─── Bridge: NextRequest (Web API) → Express/NestJS (Node.js) ───────────────
async function bridge(req: NextRequest): Promise<Response> {
  const expressApp = await getNestApp();

  return new Promise<Response>((resolve) => {
    const url = new URL(req.url);

    const nodeReq = Object.assign(new IncomingMessage(null as any), {
      method:  req.method,
      url:     url.pathname + url.search,
      headers: Object.fromEntries(req.headers.entries()),
    }) as IncomingMessage;

    req.arrayBuffer().then((buf) => {
      const chunks: Buffer[] = buf.byteLength > 0 ? [Buffer.from(buf)] : [];
      let idx = 0;
      (nodeReq as any)._read = () => {
        nodeReq.push(idx < chunks.length ? chunks[idx++] : null);
      };

      const headers: Record<string, string> = {};
      const statusHolder = { code: 200 };
      const bodyChunks: Buffer[] = [];

      const nodeRes = new ServerResponse(nodeReq);
      nodeRes.writeHead = (statusCode: number, hdrs?: any) => {
        statusHolder.code = statusCode;
        if (hdrs) Object.assign(headers, hdrs);
        return nodeRes;
      };
      nodeRes.setHeader = (name: string, value: any) => {
        headers[name.toLowerCase()] = String(value);
        return nodeRes;
      };
      (nodeRes as any).write = (chunk: any) => {
        bodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        return true;
      };
      nodeRes.end = (chunk?: any) => {
        if (chunk) bodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        resolve(new Response(Buffer.concat(bodyChunks), {
          status:  statusHolder.code,
          headers: headers,
        }));
        return nodeRes;
      };

      expressApp(nodeReq, nodeRes);
    });
  });
}

// ─── HTTP method handlers ────────────────────────────────────────────────────
export async function GET(req: NextRequest)     { return bridge(req); }
export async function POST(req: NextRequest)    { return bridge(req); }
export async function PUT(req: NextRequest)     { return bridge(req); }
export async function PATCH(req: NextRequest)   { return bridge(req); }
export async function DELETE(req: NextRequest)  { return bridge(req); }
export async function OPTIONS(req: NextRequest) { return bridge(req); }
