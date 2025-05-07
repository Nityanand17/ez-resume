import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class MongoDBAtlasGuard extends AuthGuard("mongodb-atlas") {}
