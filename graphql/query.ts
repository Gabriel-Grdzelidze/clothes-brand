import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      title
      description
      price
      category
      mainImg
      img1
      img2
    }
  }
`;

export const GET_PRODUCT = gql`
  query Products($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      category
      mainImg
      img1
      img2
    }
  }
`;


export const CART_PRODUCTS= gql`
  query Order{
    order{
      id
      name
      price
      mainImg
    }
  }
`


export const GET_USERS= gql`
  query User($email:email){
    users(email:$email){
      id
      name
      email
      password
    }
  }
`
export const GET_PRODUCT_CARD = gql`
  query Products {
    products {
      id
      title
      price
      category
      mainImg
    }
  }
`;
