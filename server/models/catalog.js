import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: String, required: true },
    availability: { type: Boolean, required: true, default: true },
    color: { type: String, required: true },
    imagePath: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true },
    brand: { type: String, required: true },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

export default mongoose.model('Catalog', catalogSchema);
