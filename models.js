let mongoose = require("mongoose");
let Schema = mongoose.Schema;
                    
let bookSchema = new Schema({
	title: String,
  commentcount: 0,
  comments: []
});

let Book = mongoose.model('Book', bookSchema);

exports.bookModel = Book;