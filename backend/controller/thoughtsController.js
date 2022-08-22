const { Thought, Reaction } = require("../models");

// Get all thoughts
const getThoughts = (req, res) => {
  Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

// Get a thought
const getSingleThought = (req, res) => {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// Create a thought
const createThought = (req, res) => {
  Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

// Delete a thought
const deleteThought = (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : Reaction.deleteMany({ _id: { $in: thought.reaction } })
    )
    .then(() => res.json({ message: "thought and reactions deleted!" }))
    .catch((err) => res.status(500).json(err));
}

// Update a thought
const updateThought = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
}