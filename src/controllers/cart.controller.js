import { CartModel } from '../dao/models/cart.js';
import { ProductModel } from '../dao/models/product.js';
import { TicketModel } from '../dao/models/ticket.js';
import { CartRepository } from '../repositories/cartRepository.js';
import { TicketRepository } from '../repositories/ticketRepository.js';
import { v4 as uuidv4 } from 'uuid';

const cartRepo = new CartRepository(CartModel);
const ticketRepo = new TicketRepository(TicketModel);

export const addToCart = async (req,res)=>{
  const {pid,qty}=req.body;
  let cart = await cartRepo.getByUser(req.user.id);
  if(!cart) cart = await CartModel.create({user:req.user.id,products:[]});
  const idx = cart.products.findIndex(p=>p.product.equals(pid));
  if(idx>-1) cart.products[idx].quantity += qty;
  else cart.products.push({product:pid,quantity:qty});
  await cart.save();
  res.json(cart);
};

export const purchase = async (req,res)=>{
  let cart = await cartRepo.getByUser(req.user.id);
  if(!cart) return res.status(400).json({error:'No cart'});
  let amount=0;
  let notProcessed=[];
  for(const item of cart.products){
    const product = await ProductModel.findById(item.product);
    if(product.stock>=item.quantity){
      product.stock -= item.quantity;
      await product.save();
      amount += product.price*item.quantity;
    }else{
      notProcessed.push({product:item.product.toString(),needed:item.quantity,stock:product.stock});
    }
  }
  const ticket = await ticketRepo.create({code:uuidv4(),amount,purchaser:req.user.email});
  cart.products = [];
  await cart.save();
  res.json({ticket,notProcessed});
};
