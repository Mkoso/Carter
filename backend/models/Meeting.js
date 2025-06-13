const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true
  },
  participants: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: true
  },
  recordingUrl: {
    type: String
  },
  contactIds: [{
    type: String,
    required: true
  }],
  companyIds: [{
    type: String,
    required: true
  }],
  dealIds: [{
    type: String
  }],
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meeting', meetingSchema); 