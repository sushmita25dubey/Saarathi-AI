import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const datasourceUrl = new URL(process.env.DATABASE_URL);

if (!datasourceUrl.searchParams.has("connect_timeout")) {
  datasourceUrl.searchParams.set("connect_timeout", "30");
}

const adapter = new PrismaPg({
  connectionString: datasourceUrl.toString(),
});

export const db =
  globalThis.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
