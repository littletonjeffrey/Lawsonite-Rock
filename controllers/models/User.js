const { Schema, model } = require('mongoose');
// Schema to create user model
const userSchema = new Schema(
  {
     
    userName: {
      type: String,
      // have to havee a user name
      required: true, 
      //limitting length
      max_length: 50,
      //must be unique to the DB
      unique: true,
      //removes whitespace characters from the begining and end of the username
      trim: true,
    },
    email: {
      type: String,
      //must have an email
      required: true,
      //limitting length
      max_length: 75,
      //validates that the email is in the proper format
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'not a valid email address']
    },
    //Array of `_id` values referencing the `Thought` model
    thought: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  //Array of `_id` values referencing the `User` model (self-reference)
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    ],
  },
  {
   //allows virtuals (friendCount) 
    toJSON: {
      virtuals: true,
    },
    //stops mongoDB from generating a random id
    id: false,
  }
);
//creates a variable based on this schema
const User = model('user', userSchema);
//exports the variable to be used in other pages
module.exports = User;
