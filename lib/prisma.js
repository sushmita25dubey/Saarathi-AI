import { PrismaClient } from "./generated/prisma/client";

const datasourceUrl = new URL(process.env.DATABASE_URL);
if (!datasourceUrl.searchParams.has("connect_timeout")) {
  datasourceUrl.searchParams.set("connect_timeout", "30");
}

export const db =
  globalThis.prisma ||
  new PrismaClient({ datasourceUrl: datasourceUrl.toString() });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}