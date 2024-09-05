const mongoose = require("mongoose");

const UserModel = mongoose.model("User", {
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'] },
    password: { type: String, required: true },
})

module.exports = UserModel;