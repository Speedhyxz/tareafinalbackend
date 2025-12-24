export class ProductRepository{
  constructor(dao){ this.dao = dao; }
  create(data){ return this.dao.create(data); }
  update(id,data){ return this.dao.findByIdAndUpdate(id,data,{new:true}); }
  delete(id){ return this.dao.findByIdAndDelete(id); }
  findAll(){ return this.dao.find(); }
}
