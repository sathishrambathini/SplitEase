const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    name: String,
    description: String,
    amount: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    date: Date,
    userId: String,
    groupId: String,
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("expense", ExpenseSchema)