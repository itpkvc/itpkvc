const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departSchema = new Schema({
    name : { type : String ,  unique : true,trim : true},
    status : {type : String},
    updated : { type : Date , default : Date.now }
})

var departModel = mongoose.model('Department',departSchema);
module.exports = departModel