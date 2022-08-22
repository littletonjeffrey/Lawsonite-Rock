const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { user, thought } = require("./seedData");
const colors = require("colors");
const mongoose = require("mongoose");

connection.on("error", (err) => err);

const seedDB = async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  await User.insertMany(user);
  await Thought.insertMany(thought);

  console.table(User);
  console.table(Thought);
};

connection.once("open", async () => {
  console.log("CONNECTED TO DB".bgGreen);
  seedDB().then(() => {
    console.info("Seeding complete! 🌱".green);
    process.exit(0);
  });
});
