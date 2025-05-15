import path from "node:path";

import { HttpException, Module } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { RavenInterceptor, RavenModule } from "nest-raven";
import { ZodValidationPipe } from "nestjs-zod";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { FeatureModule } from "./feature/feature.module";
import { HealthModule } from "./health/health.module";
import { MailModule } from "./mail/mail.module";
import { PrinterModule } from "./printer/printer.module";
import { ResumeModule } from "./resume/resume.module";
import { StorageModule } from "./storage/storage.module";
import { UserModule } from "./user/user.module";
import { GeminiModule } from "./gemini/gemini.module";

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    DatabaseModule,
    MailModule,
    RavenModule,
    HealthModule,

    // Feature Modules
    AuthModule,
    UserModule,
    ResumeModule,
    StorageModule,
    PrinterModule,
    FeatureModule,
    GeminiModule,

    // Static Assets
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "artboard"),
      serveRoot: "/artboard",
      exclude: ["/api*"],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "client"),
      exclude: ["/api*"],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          // Filter all HttpException with status code <= 500
          {
            type: HttpException,
            filter: (exception: HttpException) => exception.getStatus() < 500,
          },
        ],
      }),
    },
  ],
})
export class AppModule {}
