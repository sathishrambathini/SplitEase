const userSchema  = require("../modals/modal.js");

createUser = async (req) => {
    return await userSchema.create(req);
};

checkUserExist = async (req) => {
    console.log("console.log", req)
    return await userSchema.findOne({"email" : req.email});
};

validateLogin = async (req) => {
    return await userSchema.findOne({"email" : req.email, "password": req.password});
};

getUser = async () => {
    return await userSchema.find();
};

checkGroupId = async (req) => {
    return await userSchema.find({"groupId": req.groupId});
};

checkUserIdExists = async (req) => {
    return await userSchema.findOne({"_id" : req.userId});
};


module.exports = {
    createUser,
    checkUserExist,
    validateLogin,
    getUser,
    checkGroupId,
    checkUserIdExists
}