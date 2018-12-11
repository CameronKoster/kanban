let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "List"

let schema = new Schema({
  boardId: { type: ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model(schemaName, schema)