import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $category: String!
    $size: String!
    $color: String!
    $imageUrls: [String!]!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      category: $category
      size: $size
      color: $color
      imageUrls: $imageUrls
    ) {
      _id
      username
      email
      productCount
      savedProducts {
        _id
        name
        description
        price
        category
        size
        color
        imageUrls
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
      username
      email
      productCount
      savedProducts {
        _id
        name
        description
        price
        category
        size
        color
        imageUrls
      }
    }
  }
`;