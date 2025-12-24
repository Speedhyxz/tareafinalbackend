export const onlyAdmin = (req,res,next)=>{
  if(req.user?.role !== 'admin') return res.status(403).json({error:'Admins only'});
  next();
};

export const onlyUser = (req,res,next)=>{
  if(req.user?.role !== 'user') return res.status(403).json({error:'Users only'});
  next();
};