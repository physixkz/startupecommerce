const bcrypt = require('bcrypt');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    userById: async (_, { userId }) => {
      return await User.findById(userId);
    }
    // Add other query resolvers if needed...
  },

  Mutation: {
    createUser: async (_, { email, username, password }) => {
      try {
        if (!email || !username || !password) {
          throw new Error('Please provide all required fields');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          email,
          username,
          password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = signToken({
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email
        });

        return {
          _id: savedUser._id,
          email: savedUser.email,
          username: savedUser.username,
          token
        };
      } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error('User creation failed');
      }
    },

    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new Error('Invalid credentials: User not found');
        }
    
        console.log('User retrieved from DB:', user);
        console.log('Plain text password:', password);
    
        const passwordMatch = await user.isCorrectPassword(password);
    
        console.log('Password match result:', passwordMatch);
    
        if (!passwordMatch) {
          throw new Error('Invalid credentials: Password mismatch');
        }
    
        const token = signToken({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
    
        return {
          _id: user._id,
          email: user.email,
          username: user.username,
          token,
        };
      } catch (error) {
        console.error('Error logging in:', error.message);
        throw new Error('Invalid credentials: Password mismatch');
      }
    },
    

    
    
    
    // Add other mutation resolvers if needed...
  }
};

module.exports = userResolvers;
