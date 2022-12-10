const express = require("express");
const router = express.Router();
const { createUser, loginUser, createExpense, updateExpense, deleteExpense } = require("../controllers/controller")

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/expense/create").post(createExpense);
router.route("/expense/update").put(updateExpense);
router.route("/expense/delete/:id").delete(deleteExpense);
module.exports = router;