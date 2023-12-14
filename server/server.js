const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');
const productRoutes = require('./routes/api/product-routes'); // Adjust the path accordingly
const userRoutes = require('./routes/api/user-routes');
const cors = require('cors');

require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quantum_db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// Mount the product routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Mount user routes

// Start the Apollo Server
server.start().then(() => {
  app.use('/graphql', expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
