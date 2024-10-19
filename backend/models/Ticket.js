const mongoose = require('mongoose');
const { IUser } = require('./User');
const { IEvent } = require('./Event');

const TicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  qrCode: { type: String, required: true },
  isValid: { type: Boolean, default: true },
});

module.exports = mongoose.model("Ticket", TicketSchema);

