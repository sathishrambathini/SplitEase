const expenseSchema  = require("../modals/expenseModal.js");

createExpenses = async (req) => {
    return await expenseSchema.create(req);
};

updateExpenses = async (id, req) => {
    return await expenseSchema.updateOne({"_id": id,}, req);
};

deleteExpenses = async (id) => {
    return await expenseSchema.deleteOne({"_id": id});
};

module.exports = {createExpenses, updateExpenses, deleteExpenses}