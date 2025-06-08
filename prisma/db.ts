import { PrismaClient } from "@prisma/client";

const URL=process.env.DATABASE_URL

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: URL,
      },
    },
  });
}

export default createPrismaClient