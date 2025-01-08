const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  category: {
    type: String,
    required: true,
    index: true
  },
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
skillSchema.index({ 
  name: 'text', 
  category: 'text' 
});

module.exports = mongoose.model('Skill', skillSchema);
