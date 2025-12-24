import { verifyToken } from '../utils/auth.js';

export const current = (req,res,next)=>{
  try{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});
    const user = verifyToken(token);
    req.user = user;
    next();
  }catch(e){
    return res.status(401).json({error:'Invalid token'});
  }
};