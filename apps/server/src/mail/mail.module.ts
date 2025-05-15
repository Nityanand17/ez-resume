import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "@/server/config/schema";

import { MailService } from "./mail.service";

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
