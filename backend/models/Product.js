const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    category: { type: String, default: '' },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Add text index for simple search
ProductSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', ProductSchema);