const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  bookid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: String,
}, {
  timestamps: true,
});

const BookReqeustModel = mongoose.model("bookrequest", bookRequestSchema);

module.exports = BookReqeustModel;