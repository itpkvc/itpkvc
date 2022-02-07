const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    subject : { type : String , trim : true},
    user_id : Schema.Types.ObjectId,
    department_id : Schema.Types.ObjectId,
    auto : {type : String},
    material : {type : String},
    updated : { type : Date , default : Date.now }
})

var themeModel = mongoose.model('Theme',themeSchema);
module.exports = themeModel