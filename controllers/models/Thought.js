const { Schema, model } = require('mongoose');
//import dateFormat helper
const dateFormat = require('../utils/dateFormat');
//import reactionSchema
const reactionSchema = require('./Reaction')
// Schema to create thought model
const thoughtSchema = new Schema(
  {
   // body of the thought, must be a string between 1 and 280 characters, is required to create
    thoughtBody: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    //date stamp with getter applied to format it with helper
    createdAt: {
        type: Date,
        default: Date.now(),    
        get: currentDate =>
        dateFormat(currentDate)
      },
    //require username for post
    userName: { 
        type: String, 
        required: true,
    },
    //reactions will be a virtual schema 
    
    //------(referenced Sara Baqla's project for syntax, thought reaction needed curly brackets)
    reaction: 
        [reactionSchema]
    //---------------------------------
},   
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual thought schema for reactions
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
      return this.reaction.length;
  })
//create variable to export Thought
const Thought = model('thought', thoughtSchema);
// exporting Thought model
module.exports = Thought;