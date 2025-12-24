export class CartRepository{
  constructor(dao){ this.dao = dao; }
  getByUser(user){ return this.dao.findOne({user}).populate('products.product'); }
  save(cart){ return cart.save(); }
}
