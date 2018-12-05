const mongoose = require('mongoose');

const { Schema } = mongoose;

const contextSchema = new Schema({
  context: { type: Object, default: {} },
});

module.exports = mongoose.model('Context', contextSchema);
