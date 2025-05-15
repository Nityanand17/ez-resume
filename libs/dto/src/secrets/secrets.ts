import { idSchema } from "@reactive-resume/schema";
import { z } from "zod";

export const secretsSchema = z.object({
  id: idSchema,
  password: z.string().nullable(),
  lastSignedIn: z.date().nullable(),
  verificationToken: z.string().nullable(),
  twoFactorSecret: z.string().nullable(),
  twoFactorBackupCodes: z.union([
    z.array(z.string()).default([]),
    z.string().nullable().transform(val => val ? JSON.parse(val) : []),
  ]).default([]),
  refreshToken: z.string().nullable(),
  resetToken: z.string().nullable(),
  userId: idSchema,
});
