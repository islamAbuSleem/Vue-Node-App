const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    first: { type: String },
    last: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isactive: { type: Boolean, default: true },
    createdOn: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    dept: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;