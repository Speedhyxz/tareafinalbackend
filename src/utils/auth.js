import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPassword = async (pwd)=> await bcrypt.hash(pwd,10);
export const comparePassword = async (pwd,hash)=> await bcrypt.compare(pwd,hash);
export const generateToken = (payload)=> jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
export const verifyToken = (token)=> jwt.verify(token,process.env.JWT_SECRET);
