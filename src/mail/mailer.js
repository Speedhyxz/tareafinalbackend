import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendResetMail = async (to, link)=>{
  await transporter.sendMail({
    to,
    subject:'Restablecer contraseña',
    html:`<p>Haz clic para restablecer:</p>
    <a href="${link}">Restablecer contraseña</a>`
  });
};
