const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { user, thought } = require("./seedData");
const colors = require("colors");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("CONNECTED TO DB".bgGreen);

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});

  // Add Users to the collection and await the results
  await User.insertMany({ user });

  // Add Thoughts to the collection and await the results
  await Thought.insertMany({ thought });

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.table(Thought);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
