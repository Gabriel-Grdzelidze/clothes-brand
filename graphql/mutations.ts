import gql from "graphql-tag";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $title: String!
    $description: String!
    $price: Float
    $mainImg: String!
    $img1: String!
    $img2: String!
    $category: String!
  ) {
    addProduct(
      title: $title
      price: $price
      description: $description
      mainImg: $mainImg
      img1: $img1
      img2: $img2
      category: $category
    ) {
      id
      title
      description
      price
      mainImg
      img1
      img2
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      title
      description
      price
      mainImg
      img1
      img2
      category
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      password
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $title: String!
    $description: String!
    $price: Float
    $mainImg: String!
    $img1: String!
    $img2: String!
  ) {
    updateProduct(
      id: $id
      title: $title
      price: $price
      description: $description
      mainImg: $mainImg
      img1: $img1
      img2: $img2
    ) {
      id
      title
      description
      price
      mainImg
      img1
      img2
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart($id: ID!, $price: Float, $mainImg: String, $name: String) {
    addProductToCart(id: $id, price: $price, mainImg: $mainImg, name: $name) {
      id
      name
      price
      mainImg
    }
  }
`;

export const REMOVE_PRODUCT_TO_CART = gql`
  mutation removeProductToCart($id: ID!) {
    removeProductToCart(id: $id) {
      id
      name
      price
      mainImg
    }
  }
`;
export const CLEAR_CART = gql`
  mutation clearCart {
    clearCart {
      id
      name
      price
      mainImg
    }
  }
`;
