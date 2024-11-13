const mongoose = require('mongoose');

// Define the schema for a single product
const OneProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true, unique: true }, // Set unique to true
    imageUrl: { type: String, required: true },
    discountedPrice: { type: String },
    originalPrice: { type: String },
    quantity: { type: Number },
});

// Export the Product model based on OneProductSchema directly
const Product = mongoose.model('Product', OneProductSchema);
module.exports = Product;
