const express = require("express");
const router = express.Router();
const { 
    createUser, 
    loginUser, 
    createExpense, 
    updateExpense, 
    deleteExpense, 
    createGroup, 
    joinGroup, 
    groups,
    getAllExpenses,
    getUsers,
    getActivity,
    getCode,
    deleteUser
} = require("../controllers/controller")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/expense/create").post(createExpense);
router.route("/expense/update").put(updateExpense);
router.route("/expense/delete/:id").delete(deleteExpense);
router.route("/expense/:groupId/:userId").get(getAllExpenses);
router.route("/group").post(createGroup);
router.route("/join/group").post(joinGroup);
router.route("/groups/:userId").get(groups);
router.route("/users/:groupId").get(getUsers);
router.route("/activity/:groupId").get(getActivity);
router.route("/user/delete").delete(deleteUser)
router.route("/getCode").get(getCode);
module.exports = router;