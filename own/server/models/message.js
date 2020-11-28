const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	}, 
	body: {
		type: String,
		required: [true, 'Body field is required.']
	}
})

// Creating a table within database with the defined schema
// What the fuck? Not the table! It's the model!
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
// Message is the model, mapped to the collection consisting of the documents by certain schema
module.exports = Message
