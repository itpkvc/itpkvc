const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    name : {type:String },
    image_name : {type : String},
    user_id : Schema.Types.ObjectId,
    department_id : Schema.Types.ObjectId,
    detail : {type:String },
    updated : {type: Date, default: Date.now }
});
const newsModel = mongoose.model('News',newsSchema );
module.exports = newsModel;