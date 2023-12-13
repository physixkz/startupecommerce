const { User } = require('../models');

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find({}); // Retrieve all users
    },
    userById: async (_, { userId }) => {
      return await User.findById(userId); // Retrieve user by ID
    }

  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const newUser = new User({
        email,
        password // Note: Password should be hashed before saving in a production scenario

      });
      return await newUser.save(); // Save the new user
    }

  }
};

module.exports = userResolvers;
