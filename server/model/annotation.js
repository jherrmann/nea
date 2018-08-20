const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
var namedEntitySchema = new Schema({
  entity: { type: String, required: true },
  begin: { type: Number, required: true },
  end: { type: Number, required: true },
  value: { type: String, required: true }
});

const annotationSchema = new Schema({
  job: { type: Schema.Types.ObjectId },
  anno_set_name: { type: String },
  text: { type: String, required: true },
  named_entities: [namedEntitySchema],
  created_by: { type: String },
  created_date: { type: Date },
  last_modified_by: { type: String },
  last_modified_date: { type: Date }
}, { collection: 'annotations' });

const Annotation = mongoose.model('Annotation', annotationSchema);

module.exports = Annotation;