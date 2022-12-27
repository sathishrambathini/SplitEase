const userSchema = require("../modals/userModal");
const groupSchema = require("../modals/groupModal");
const assignSchema = require("../modals/assignModal");
createUser = async (req) => {
  return await userSchema.create(req);
};

checkUserExist = async (req) => {
  return await userSchema.findOne({ email: req.email });
};

validateLogin = async (req) => {
  return await userSchema
    .findOne({ email: req.email, password: req.password })
    .select("-__v -password");
};

getUser = async (req) => {
  return await userSchema.findOne(req);
};

deleteUser = async (id) => {
  return await userSchema.deleteOne({ _id: id });
};

checkGroupId = async (req) => {
  return await userSchema.find({ groupId: req.groupId });
};

checkUserIdExists = async (req) => {
  return await userSchema.findOne({ _id: req.userId });
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

checkAssign = async (req) => {
  return await assignSchema.findOne(req);
};

getGroupDetails = async (req) => {
  return await groupSchema.findOne(req);
};

getUsers = async (req) => {
  return await assignSchema.find(req);
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
  getGroupDetails,
  checkAssign,
  getUsers,
  deleteUser
};
