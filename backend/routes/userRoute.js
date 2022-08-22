const { getUsers, getSingleUser, createUser, deleteUser, addFriend, removeFriend } = require("../controller/userController");
const express = require('express');
const router = express.Router();


router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getSingleUser).delete(deleteUser).put(addFriend).put(removeFriend)

module.exports = router;
