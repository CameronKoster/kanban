let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let comment = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  name: { type: String, required: true }
})

let schema = new Schema({
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true },
  comments: [comment]
})



module.exports = mongoose.model(schemaName, schema)