const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
const grade = async (userId) =>
  User.aggregate([
    // only include the given user by using $match
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: "$friends",
    },
    {
      $group: {
        _id: ObjectId(userId),
        overallGrade: { $avg: "$friends.score" },
      },
    },
  ]);

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then(async (users) => {
      const userObj = {
        users,
        headCount: await headCount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Get a single user
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({
            user,
            grade: await grade(req.params.userId),
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// create a new user
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// Delete a user and remove their thoughts
const deleteUser = (req, res) => {
  User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No such user exists" })
        : Thought.findAllAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          )
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({
            message: "User deleted, but no thoughts found",
          })
        : res.json({ message: "User successfully deleted" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add a friend to a user
const addFriend = (req, res) => {
  console.log(`You and ` + req.body` are now friends.`);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "Cannot find this user for you to be friends with.",
          })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// Remove friend from a user
const removeFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friend: { friendId: req.params.friendId } } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "You not friends with this user." })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
};
