const express = require("express");
const {
  getAllUsers,
  getUserById,
  validateUser,
  createUser,
  deleteUser,
} = require("../Controllers/users.controller");
const router = express.Router();

router.route("").get(getAllUsers).post(validateUser, createUser);
router.route("/:id").get(getUserById).delete(deleteUser);

module.exports = router;
