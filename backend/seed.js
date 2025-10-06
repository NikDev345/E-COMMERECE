require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const fs = require('fs');

async function seed() {
  try {
    await connectDB();
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    await Product.deleteMany({});
    const inserted = await Product.insertMany(data);
    console.log(`Inserted ${inserted.length} products`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();