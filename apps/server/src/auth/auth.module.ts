import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { MailModule } from "../mail/mail.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { MongoDBAtlasStrategy } from "./strategy/mongodb-atlas.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { TwoFactorStrategy } from "./strategy/two-factor.strategy";

@Module({
  imports: [
    PassportModule, 
    JwtModule, 
    forwardRef(() => UserModule), 
    MailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    TwoFactorStrategy,
    MongoDBAtlasStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
