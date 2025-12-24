export class UserRepository{
  constructor(dao){ this.dao = dao; }
  create(data){ return this.dao.create(data); }
  findByEmail(email){ return this.dao.findOne({email}); }
  findById(id){ return this.dao.findById(id); }
  updatePassword(id,password){ return this.dao.findByIdAndUpdate(id,{password}); }
}
