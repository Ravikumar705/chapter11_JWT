import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0, max: 1000 },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  thumbnail: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);
export { productModel };
