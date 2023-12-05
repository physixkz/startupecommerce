const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  size: [String],
  color: String,
  imageUrls: [String],
  // Add more fields as needed for your application
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
