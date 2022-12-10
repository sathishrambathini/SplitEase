const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    groupId: String,
    role: {
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model("user", UserSchema)