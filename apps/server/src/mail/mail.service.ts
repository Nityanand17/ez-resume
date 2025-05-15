import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ISendMailOptions } from "@nestjs-modules/mailer";

import { Config } from "@/server/config/schema";

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<Config>
  ) {}

  async sendEmail(options: ISendMailOptions) {
    // Log the email to the console instead of sending it
    Logger.log(options, "MailService#sendEmail");
    return;
  }
}
