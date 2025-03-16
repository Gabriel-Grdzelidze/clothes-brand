import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../../graphql/resolvers";
import { typeDefs } from "../../../graphql/typedefs";
import { PrismaClient } from "@prisma/client";
import createPrismaClient from "../../../prisma/db";





export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true, 
 
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ 
    req, 
    res, 
    prisma: createPrismaClient(), 
  }),
});

export { handler as GET, handler as POST };
