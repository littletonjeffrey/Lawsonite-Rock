const { Schema } = require('mongoose');
// import dateFormat helper
const dateFormat = require('../utils/dateFormat');

//creating reaction schema
const reactionSchema = new Schema(
    {
        //gives id # to reaction using thought's id
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () =>
            new Types.Object.Id() 
        },
        //body content of the reaction
            reactionBody: { 
                type: String, 
                required: true,
                minLength: 1,
                maxLength: 280,
            },
            //userName of who posted the raction
            userName: {
                type: String,
                required: true,
            },
            //dateStamp of when the reaction was posted
            createdAt: {
                type:Date,
                default: Date.now,
                get: currentDate =>
                dateFormat(currentDate),
            }
        },
        {
            //needed to convert full reaction to JSON
            toJSON: {
                getters: true,
            },
            //stops id from auto generating
            id: false,
        }
    
);

//exports the schema to be used on other pages
module.exports = { reactionSchema };