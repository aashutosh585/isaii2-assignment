const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // File information
  fileName: String,
  fileUrl: String,
  
  // Personal information (flexible array format)
  personalInfo: [{
    key: String,    // e.g., "name", "email", "github", "leetcode", "linkedin", "portfolio", "phone", "twitter", etc.
    value: String   // the actual value
  }],
  
  // Resume sections (flexible array format)
  education: [{
    key: String,    // e.g., "university1", "university2", "degree1", "degree2", etc.
    value: String   // the actual value
  }],
  
  projects: [{
    key: String,    // e.g., "project1", "project2", "project3", etc.
    value: String   // the actual value
  }],
  
  experience: [{
    key: String,    // e.g., "company1", "company2", "role1", "role2", etc.
    value: String   // the actual value
  }],
  
  extraData: [{
    key: String,    // e.g., "skills", "certifications", "achievements", "languages", etc.
    value: String   // the actual value
  }],
  
  // ATS compatibility score
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  
  // AI chat history for this resume
  aiChatHistory: [{
    userMessage: String,
    aiResponse: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);