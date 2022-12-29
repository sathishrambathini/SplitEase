const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSchema = new Schema({
    userId: String,
    groupId: String,
    uuid: String,
    groupName: String,
    email: String,
    userName: String,
    createdBy: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("assign", assignSchema)