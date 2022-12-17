const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    name: String,
    description: String,
    amount: String,
    date: Date,
    userId: String,
    groupId: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("expense", ExpenseSchema)