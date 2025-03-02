import { Context } from "@apollo/client";

export const resolvers = {
  Query: {
    products: async (parent: any, args: any, context: Context) => {
      return await context.prisma.product.findMany();
    },
    product: async (parent: any, args: any, context: Context) => {
      return await context.prisma.product.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    users: async (parent: any, args: any, context: Context) => {
     return await context.prisma.user.findMany();
    },
  },
  Mutation: {
    addProduct: async (parent: any, args: any, context: Context) => {
      return await context.prisma.product.create({
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          mainImg: args.mainImg,
          img1: args.img1,
          img2: args.img2,
          category: args.category,
        },
      });
    },

    deleteProduct: async (parent: any, args: any, context: Context) => {
      return await context.prisma.product.delete({
        where: {
          id: args.id,
        },
      });
    },
    updateProduct: async (parent: any, args: any, context: Context) => {
      return await context.prisma.product.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          mainImg: args.mainImg,
          img1: args.img1,
          img2: args.img2,
          category: args.category,
        },
      });
    },
    addUser: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
    },
    deleteUser: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
