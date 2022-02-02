const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeImageSchema = new Schema({
    theme_id : Schema.Types.ObjectId,
    name : {type : String},
    updated : { type : Date , default : Date.now }
})

var themeImageModel = mongoose.model('ThemeImage',themeImageSchema);
module.exports = themeImageModel