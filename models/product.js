import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: {
    type: Number,
    required: true,
    default: 20,
  },
  description: {
    type: String,
    required: true,
    default: "description",
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
