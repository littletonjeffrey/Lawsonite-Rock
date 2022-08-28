const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
