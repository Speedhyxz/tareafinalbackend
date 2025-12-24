import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'ecommerce' });
    console.log('Mongo connected');
  } catch (e) {
    console.error('DB error', e);
    process.exit(1);
  }
};
