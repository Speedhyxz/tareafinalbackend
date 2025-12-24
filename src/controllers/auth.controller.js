import { UserModel } from '../dao/models/user.js';
import { PasswordResetModel } from '../dao/models/passwordReset.js';
import { UserRepository } from '../repositories/userRepository.js';
import { ResetRepository } from '../repositories/resetRepository.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { v4 as uuidv4 } from 'uuid';
import { sendResetMail } from '../mail/mailer.js';

const userRepo = new UserRepository(UserModel);
const resetRepo = new ResetRepository(PasswordResetModel);

export const register = async (req,res)=>{
  const {first_name,last_name,email,password}=req.body;
  const hashed = await hashPassword(password);
  const user = await userRepo.create({first_name,last_name,email,password:hashed});
  res.json({status:'ok',user:{id:user._id,email:user.email}});
};

export const login = async (req,res)=>{
  const {email,password}=req.body;
  const user = await userRepo.findByEmail(email);
  if(!user) return res.status(400).json({error:'Invalid'});
  const valid = await comparePassword(password,user.password);
  if(!valid) return res.status(400).json({error:'Invalid'});
  const token = generateToken({id:user._id,role:user.role,email:user.email});
  res.json({token});
};

export const currentUser = async (req,res)=>{
  const user = await userRepo.findById(req.user.id);
  res.json({user:{
    id:user._id,
    name:user.first_name+' '+user.last_name,
    email:user.email,
    role:user.role
  }});
};

export const requestReset = async (req,res)=>{
  const {email}=req.body;
  const user = await userRepo.findByEmail(email);
  if(!user) return res.status(200).json({msg:'If exists, email sent'});
  const token = uuidv4();
  const expiresAt = new Date(Date.now()+3600000);
  await resetRepo.create({user:user._id,token,expiresAt});
  const link = process.env.FRONT_URL + '/reset-password?token='+token;
  await sendResetMail(email,link);
  res.json({msg:'Email sent'});
};

export const resetPassword = async (req,res)=>{
  const {token,newPassword}=req.body;
  const record = await resetRepo.findValid(token);
  if(!record) return res.status(400).json({error:'Invalid or expired'});
  const user = record.user;
  const same = await comparePassword(newPassword,user.password);
  if(same) return res.status(400).json({error:'Cannot reuse password'});
  const hashed = await hashPassword(newPassword);
  await userRepo.updatePassword(user._id,hashed);
  await resetRepo.markUsed(record._id);
  res.json({msg:'Password updated'});
};
