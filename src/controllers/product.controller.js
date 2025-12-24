import { ProductModel } from '../dao/models/product.js';
import { ProductRepository } from '../repositories/productRepository.js';
const productRepo = new ProductRepository(ProductModel);

export const createProduct = async (req,res)=>{
  const prod = await productRepo.create(req.body);
  res.json(prod);
};
export const updateProduct = async (req,res)=>{
  const prod = await productRepo.update(req.params.pid,req.body);
  res.json(prod);
};
export const deleteProduct = async (req,res)=>{
  await productRepo.delete(req.params.pid);
  res.json({status:'deleted'});
};
export const listProducts = async (req,res)=>{
  const prods = await productRepo.findAll();
  res.json(prods);
};
