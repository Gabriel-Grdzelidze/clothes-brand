export const typeDefs = `#graphql
  type Products {
    id: ID!
    title: String
    mainImg: String
    img1: String
    img2: String
    category: String
    price: Float
    description: String
  }

  type User {
    id: ID!
    name: String
    email: String 
    password: String
  }

  type Order {
    id: ID!
    name: String
    price: Float
    mainImg: String
    createdAt: String
  }

  type Query {
    products: [Products]
    product(id: ID!): Products
    users: [User]
    order: [Order]
  }

  type Mutation {
    addProduct(
      title: String
      mainImg: String
      img1: String
      img2: String
      category: String
      price: Float
      description: String
    ): Products

    deleteProduct(id: ID!): Products
    updateProduct(
      id: ID!
      title: String
      mainImg: String
      img1: String
      img2: String
      category: String
      price: Float
      description: String
    ): Products

    addUser(
      name: String
      email: String 
      password: String
    ): User

    deleteUser(id: ID!): User
    addProductToCart(id: ID!, name: String, price: Float, mainImg: String): Order
    removeProductToCart(id: ID!): Order
    clearCart: [Order]
  }
`;
