import mongoose from 'mongoose';

const resetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expiresAt: Date,
  used: { type: Boolean, default: false }
});

export const PasswordResetModel = mongoose.model('PasswordReset', resetSchema);
