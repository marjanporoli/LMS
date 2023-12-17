const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    userid: String,
    phonenumber: Number,
    email: String,
    admissionyear: Number,
    department: String,
    password: String,
    takenbook: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

