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
    groups 
} = require("../controllers/controller")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/expense/create").post(createExpense);
router.route("/expense/update").put(updateExpense);
router.route("/expense/delete/:id").delete(deleteExpense);
router.route("/group").post(createGroup);
router.route("/join/group").post(joinGroup);
router.route("/groups/:userId").get(groups);
// router.route("/group/:userId").post(createGroup);
module.exports = router;