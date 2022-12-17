const userSchema  = require("../modals/userModal");
const groupSchema = require("../modals/groupModal");
const assignSchema = require("../modals/assignModal");
createUser = async (req) => {
    return await userSchema.create(req);
};

checkUserExist = async (req) => {
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

createGroup = async (req) => {
    return await groupSchema.create(req);
};

assigUserToGroup = async (req) => {
    return await assignSchema.create(req);
};

getAllGroupsOfUser = async (req) => {
    return await assignSchema.find(req);
};

getGroupDetails = async (req) => {
    return await groupSchema.findOne(req);
};

module.exports = {
    createUser,
    checkUserExist,
    validateLogin,
    getUser,
    checkGroupId,
    checkUserIdExists,
    createGroup,
    assigUserToGroup,
    getAllGroupsOfUser,
    getGroupDetails
}