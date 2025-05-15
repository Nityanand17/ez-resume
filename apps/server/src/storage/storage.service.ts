import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createId } from "@paralleldrive/cuid2";
import slugify from "@sindresorhus/slugify";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

import { Config } from "../config/schema";

// Objects are stored under the following path in the file system:
// "<storagePath>/<userId>/<type>/<fileName>",
// where `userId` is a unique identifier (cuid) for the user,
// where `type` can either be "pictures", "previews" or "resumes",
// and where `fileName` is a unique identifier (cuid) for the file.

type ImageUploadType = "pictures" | "previews";
type DocumentUploadType = "resumes";

export type UploadType = ImageUploadType | DocumentUploadType;

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private storagePath: string;
  private storageUrl: string;

  constructor(private readonly configService: ConfigService<Config>) {}

  async onModuleInit() {
    try {
      this.storagePath = this.configService.get<string>("STORAGE_PATH") || path.join(process.cwd(), "storage");
      this.storageUrl = this.configService.get<string>("STORAGE_URL") || "/storage";
      
      // Create storage directory if it doesn't exist
      if (!fs.existsSync(this.storagePath)) {
        fs.mkdirSync(this.storagePath, { recursive: true });
        this.logger.log(`Created storage directory at ${this.storagePath}`);
      }
      
      this.logger.log("Storage service initialized successfully");
    } catch (error) {
      // Log the error but don't throw, allowing the application to continue
      this.logger.error("Storage service initialization failed, continuing with limited functionality");
      this.logger.error(error);
    }
  }

  async bucketExists() {
    if (!fs.existsSync(this.storagePath)) {
      throw new InternalServerErrorException(
        "Storage directory doesn't exist"
      );
    }
    return true;
  }

  async uploadObject(
    userId: string,
    type: UploadType,
    buffer: Buffer,
    filename: string = createId(),
  ) {
    const extension = type === "resumes" ? "pdf" : "jpg";

    let normalizedFilename = slugify(filename);
    if (!normalizedFilename) normalizedFilename = createId();

    const relativePath = `${userId}/${type}`;
    const relativeFilePath = `${relativePath}/${normalizedFilename}.${extension}`;
    const fullDirPath = path.join(this.storagePath, relativePath);
    const fullFilePath = path.join(this.storagePath, relativeFilePath);
    const url = `${this.storageUrl}/${relativeFilePath}`;

    try {
      // Create directory if it doesn't exist
      if (!fs.existsSync(fullDirPath)) {
        fs.mkdirSync(fullDirPath, { recursive: true });
      }

      if (extension === "jpg") {
        // If the uploaded file is an image, use sharp to resize the image to a maximum width/height of 600px
        buffer = await sharp(buffer)
          .resize({ width: 600, height: 600, fit: sharp.fit.outside })
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      // Write file to disk
      fs.writeFileSync(fullFilePath, buffer);

      return url;
    } catch (error) {
      this.logger.error("Error uploading file:", error);
      throw new InternalServerErrorException("There was an error while uploading the file.");
    }
  }

  async deleteObject(userId: string, type: UploadType, filename: string) {
    const extension = type === "resumes" ? "pdf" : "jpg";
    const filePath = path.join(this.storagePath, userId, type, `${filename}.${extension}`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return;
    } catch (error) {
      this.logger.error("Error deleting file:", error);
      throw new InternalServerErrorException(
        `There was an error while deleting the file at the specified path: ${filePath}.`
      );
    }
  }

  async deleteFolder(prefix: string) {
    const folderPath = path.join(this.storagePath, prefix);

    try {
      if (fs.existsSync(folderPath)) {
        // Recursive delete directory
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
      return;
    } catch (error) {
      this.logger.error("Error deleting folder:", error);
      throw new InternalServerErrorException(
        `There was an error while deleting the folder at the specified path: ${folderPath}.`
      );
    }
  }
}
