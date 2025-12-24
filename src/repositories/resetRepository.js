export class ResetRepository{
  constructor(dao){ this.dao = dao; }
  create(data){ return this.dao.create(data); }
  findValid(token){ 
    return this.dao.findOne({token, used:false, expiresAt: {$gt: new Date()}}).populate('user');
  }
  markUsed(id){ return this.dao.findByIdAndUpdate(id,{used:true}); }
}
