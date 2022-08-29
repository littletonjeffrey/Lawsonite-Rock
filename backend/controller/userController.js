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
  const id = req.params.id;
  User.findOne({ _id: id })
    .select("-__v")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({
            user,
            grade: await grade(id),
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
  const id = req.params.id;
  User.findOneAndRemove({ _id: id })
  .then(async(user) =>{
    if(!user) return res.status(404).json("no user with that id");
      await Thought.findOneAndUpdate(
            { users: id },
            { $pull: { users: id } },
            { new: true }
          )
      console.log(user)
      res.status(200).json("user deleted");

      })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Update a user
const updateUser = (req, res) => {
  const id = req.params.id;
  console.log(req.bgGreen);
  User.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({
            user,
            grade: await grade(id),
          })
    )
    .catch((err) => res.status(500).json(err));
};

// Add a friend to a user
const addFriend = (req, res) => {
  const body = req.params.friendId;
  const { newFriend } = body;
  const id = req.params.id;
  console.log(body);
  console.log(`You and ${body} are now friends.`);
  User.findOneAndUpdate(
    { _id: id },
    { $set: { friends: newFriend } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "Cannot find this user for you to be friends with.",
          })
        : res.json(user)
    )
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
};

// Remove friend from a user
const removeFriend = (req, res) => {
  const id = req.params.id;
  User.findOneAndUpdate(
    { _id: id },
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
  updateUser,
  addFriend,
  removeFriend,
};
