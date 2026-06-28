const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'javascript',
  },
  result: {
    bugs: [String],
    suggestions: [String],
    complexity: String,
    score: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Scan', ScanSchema);