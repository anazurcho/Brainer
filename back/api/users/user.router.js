const router = require("express").Router();
const { createUser, getUsers, getUserByUserId, updateUser, deleteUser, login } = require("./user.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/",  updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;