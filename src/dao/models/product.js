import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true});

export const ProductModel = mongoose.model('Product', productSchema);
