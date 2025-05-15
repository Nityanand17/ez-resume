import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import { patchNestJsSwagger } from "nestjs-zod";
import path from "path";
import express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import type { Config } from "./config/schema";

patchNestJsSwagger();

// For serverless environment
const server = express();

// Creating new NestJS Application
async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, 
    new ExpressAdapter(server),
    {
      logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
    }
  );

  const configService = app.get(ConfigService<Config>);

  const accessTokenSecret = configService.getOrThrow("ACCESS_TOKEN_SECRET");
  const publicUrl = configService.getOrThrow("PUBLIC_URL");
  const isHTTPS = publicUrl.startsWith("https://") ?? false;

  // Cookie Parser
  app.use(cookieParser());

  // Session
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: accessTokenSecret,
      cookie: { httpOnly: true, secure: isHTTPS },
    }),
  );

  // CORS
  app.enableCors({ credentials: true, origin: isHTTPS });

  // Helmet - enabled only in production
  if (isHTTPS) app.use(helmet({ contentSecurityPolicy: false }));

  // Global Prefix
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  // Enable Shutdown Hooks
  app.enableShutdownHooks();

  // Swagger (OpenAPI Docs)
  // This can be accessed by visiting {SERVER_URL}/api/docs
  const config = new DocumentBuilder()
    .setTitle("Reactive Resume")
    .setDescription(
      "Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3.",
    )
    .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
    .setVersion("4.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Serve static files from storage directory
  const storagePath = process.env.STORAGE_PATH || path.join(process.cwd(), "storage");
  app.useStaticAssets(storagePath, { prefix: "/storage" });

  // Setup validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  return app;
}

// Bootstrap function for traditional hosting
async function bootstrap() {
  const app = await createApp();
  const configService = app.get(ConfigService<Config>);
  const port = configService.get<number>("PORT") ?? 3000;
  
  await app.listen(port);
  Logger.log(`🚀 Server is up and running on port ${port}`, "Bootstrap");
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line unicorn/prefer-top-level-await
  void bootstrap();
}

// For serverless environments (Vercel)
let appInstance: NestExpressApplication;

// Handler for serverless functions
export const handler = async (req: express.Request, res: express.Response) => {
  if (!appInstance) {
    appInstance = await createApp();
    await appInstance.init();
  }
  
  server(req, res);
};
