const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  hubspotId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  fromNumber: {
    type: String,
    required: true
  },
  toNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'missed', 'failed'],
    required: true
  },
  contactId: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  dealId: {
    type: String
  },
  recordingUrl: {
    type: String
  },
  summary: {
    type: String
  },
  direction: {
    type: String,
    enum: ['inbound', 'outbound'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Call', callSchema); 