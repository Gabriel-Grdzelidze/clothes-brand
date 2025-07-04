import { Context } from "../app/api/graphql/route";

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
    order: async (parent: any, args: any, context: Context) => {
      return await context.prisma.order.findMany();
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

    addProductToCart: async (parent: any, args: any, context: Context) => {
      return await context.prisma.order.create({
        data: {
          id: args.id,
          name: args.name,
          price: args.price,
          mainImg: args.mainImg,
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
    removeProductToCart: async (parent: any, args: any, context: Context) => {
      return await context.prisma.order.delete({
        where: {
          id: args.id,
        },
      });
    },

    clearCart: async (parent: any, args: any, context: Context) => {
      return await context.prisma.order.deleteMany({});
    },
  },
};
