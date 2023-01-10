const expenseSchema  = require("../modals/expenseModal.js");

createExpenses = async (req) => {
console.log(req);
    return await expenseSchema.create(req);

};

updateExpenses = async (id, req) => {
    console.log(req);
    return await expenseSchema.updateOne({"_id": id,}, req);
};

deleteExpenses = async (id) => {
    return await expenseSchema.deleteOne({"_id": id});
};

getAllExpenses = async (req) => {
    return await expenseSchema.find(req);
};

getBill=async (req)=>{

    console.log("calling get bill");
   return await expenseSchema.find(req);
}

module.exports = {
    createExpenses, 
    updateExpenses, 
    deleteExpenses,
    getAllExpenses,
    getBill
};