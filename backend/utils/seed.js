const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { user, thought } = require('./seedData');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});


// Add Users to the collection and await the results
  await User.collection.insertMany(User);

  // Add Thoughts to the collection and await the results
  await Thought.collection.insertMany(Thought);

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.table(Thought);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
