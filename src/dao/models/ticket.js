import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  amount: Number,
  purchaser: String,
  purchase_datetime: { type: Date, default: Date.now }
});

export const TicketModel = mongoose.model('Ticket', ticketSchema);
