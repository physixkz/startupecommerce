const db = require('../config/connection');
const Product = require('../models/Product');
const cleanDB = require('./cleanDB');
const productData = require('./productData.json');

db.once('open', async () => {
  try {
    await cleanDB('Product', 'products');

    const products = await Product.create(productData);

    console.log('Products seeded:', products);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
});
