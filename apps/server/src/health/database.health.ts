import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthCheckError, HealthIndicatorResult } from "@nestjs/terminus";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      // Use SQLite-compatible query
      await this.prisma.$queryRaw`SELECT 1`;

      return this.getStatus("database", true);
    } catch (error) {
      throw new HealthCheckError("Database health check failed", this.getStatus("database", false));
    }
  }
}
