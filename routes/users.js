const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUsersStats,
} = require("../controllers/users");
const router = express.Router();

router.route("/:id").put(updateUser).delete(deleteUser);
router.get("/find/:id", getUser);
router.get("/", getAllUsers);
router.get("/stats", getUsersStats);

module.exports = router;
