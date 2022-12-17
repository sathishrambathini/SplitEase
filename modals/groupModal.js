const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    createdBy: String,
    uuid: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("group", groupSchema);