const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  keyPoints: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index composé pour la recherche full-text
projectSchema.index({ 
  title: 'text', 
  description: 'text', 
  'technologies': 'text' 
});

module.exports = mongoose.model('Project', projectSchema);
