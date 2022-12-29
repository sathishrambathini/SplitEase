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
    sendEmail,
    getBill,
    deletGroup
} = require("../controllers/controller")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/expense/create").post(createExpense);
router.route("/expense/update/:id").put(updateExpense);
router.route("/expense/delete/:id").delete(deleteExpense);
router.route("/expense/:groupId/:userId").get(getAllExpenses);
router.route("/group").post(createGroup);
router.route("/join/group").post(joinGroup);
router.route("/groups/:userId").get(groups);
router.route("/delete/group/:groupId").delete(deletGroup);
router.route("/users/:groupId").get(getUsers);
router.route("/activity/:groupId").get(getActivity);
router.route("/sendemail").get(sendEmail);
router.route("/getBill/:groupId").get(getBill);
module.exports = router;