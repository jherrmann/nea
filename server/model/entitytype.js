const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema

const entitytypeSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  set: { type: String, required: true }
}, { collection: 'entitytypes' });

const Entitytype = mongoose.model('Entitytype', entitytypeSchema);

module.exports = Entitytype;