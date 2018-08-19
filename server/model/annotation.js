const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const annotationSchema = new Schema({
  text: { type: String, required: true },
  annotations: { type: Array}
}, { collection : 'annotations' });
 
const Annotation = mongoose.model('Annotation', annotationSchema);
 
module.exports = Annotation;