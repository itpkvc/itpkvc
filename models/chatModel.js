const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_id : Schema.Types.ObjectId,
    theme_id : Schema.Types.ObjectId,
    message : {type : String},
    updated : { type : Date , default : Date.now }
})

var chatModel = mongoose.model('Chat',chatSchema);
module.exports = chatModel