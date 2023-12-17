const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  ispn: String,
  author: String,
  publisher: String,
  year: Number,
  genre: String,
  issuedDate: Date,
  issuedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  isAvailable: { type: Boolean, default: true },
});
 
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;



