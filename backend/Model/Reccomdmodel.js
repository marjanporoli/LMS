// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://marjanporoli123:marjan@cluster0.ecnuwj1.mongodb.net/LMS_db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// MongoDB Schema and Model
const ReccmdSchema = new mongoose.Schema({
  title: String,
  ispn:String,
  author: String,
  publisher:String,
  year:Number,
  image:String,
  genre:String,
  issuedDate:Date,
  requestedUser:mongoose.Schema.Types.ObjectId,
  // numberOfCopies:Number

  // Add other fields as needed
});

const Reccomdmodel = mongoose.model('Reccomd', ReccmdSchema);
module.exports=Reccomdmodel;



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
