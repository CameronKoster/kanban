var mongoose = require('mongoose')
var connectionString = 'mongodb://user:test123@ds042888.mlab.com:42888/kanban'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})