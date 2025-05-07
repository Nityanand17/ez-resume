import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import * as bcryptjs from "bcryptjs";

import { ErrorMessage } from "@reactive-resume/utils";

import { UserService } from "@/server/user/user.service";

@Injectable()
export class MongoDBAtlasStrategy extends PassportStrategy(Strategy, "mongodb-atlas") {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  private async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  async validate(req: any, email: string, password: string) {
    const isRegistering = req.body.isRegistering;

    if (!email || !password) {
      throw new BadRequestException("Email and password are required");
    }

    // For new user registration
    if (isRegistering) {
      // Check if user already exists
      const existingUser = await this.userService.findOneByIdentifier(email);
      if (existingUser) {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }

      // Hash the password before storage
      const hashedPassword = await this.hashPassword(password);

      // Create a new user with MongoDB Atlas as the provider
      const newUser = await this.userService.create({
        name: email.split("@")[0], // Default name from email
        email,
        username: email.split("@")[0] + Math.floor(Math.random() * 10000), // Generate a unique username
        provider: "mongodb_atlas",
        emailVerified: true, // Auto-verify MongoDB Atlas users
        secrets: { 
          create: { 
            password: hashedPassword,
            lastSignedIn: new Date()
          } 
        },
      });

      return newUser;
    } 
    // For login
    else {
      // Find user by email
      const user = await this.userService.findOneByIdentifier(email);
      if (!user) {
        throw new BadRequestException(ErrorMessage.InvalidCredentials);
      }

      // Verify the user is using MongoDB Atlas or email authentication
      if (user.provider !== "mongodb_atlas" && user.provider !== "email") {
        throw new BadRequestException(ErrorMessage.OAuthUser);
      }

      // Validate password
      const isPasswordValid = await this.validatePassword(
        password, 
        user.secrets?.password || ""
      );

      if (!isPasswordValid) {
        throw new BadRequestException(ErrorMessage.InvalidCredentials);
      }

      // Update last sign-in time
      await this.userService.updateByEmail(email, {
        secrets: { update: { lastSignedIn: new Date() } },
      });

      return user;
    }
  }
}
