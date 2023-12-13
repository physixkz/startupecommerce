const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID
    email: String
    # Add more fields as needed
  }

  type Query {
    users: [User] # Query to retrieve all users
    userById(userId: ID!): User # Query to fetch a user by ID
    # You can add more queries here as needed
  }

  type Mutation {
    createUser(email: String!, password: String!): User # Mutation to create a new user
    # You can add more mutations here as needed
  }
`;

module.exports = userTypeDefs;
