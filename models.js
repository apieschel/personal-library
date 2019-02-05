const mongoose = require("mongoose");
const Schema = mongoose.Schema;
                    
const bookSchema = new Schema({
	title: String,
  commentcount: 0,
  comments: []
});

const Book = mongoose.model('Book', bookSchema);

exports.bookModel = Book;