const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema

const classtypeSchema = new Schema({
  name: { type: String, required: true },
  set: { type: String, required: true }
}, { collection: 'classtypes' });

const Classtype = mongoose.model('Classtype', classtypeSchema);

module.exports = Classtype;