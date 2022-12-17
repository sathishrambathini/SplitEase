const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId: String,
    groupId: String,
    uuid: String,
    groupName: String,
    email: String,
    userName: String,
    activitytext: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("activity", activitySchema);