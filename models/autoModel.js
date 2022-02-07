const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoSchema = new Schema({
    department_id : Schema.Types.ObjectId,
    name : {type : String ,trim : true, lowercase: true},
    updated : { type : Date , default : Date.now }
})

var autoModel = mongoose.model('Auto',autoSchema);
module.exports = autoModel