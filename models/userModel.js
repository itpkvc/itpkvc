var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 
    idcard : { type : String  , unique : true ,trim : true},
    idstudent : { type :Number  , unique : true,trim : true },
    email : { type : String , trim : true  ,unique : true  } ,
    password : { type : String },
    firstname : { type : String ,trim : true},
    lastname : { type : String ,trim : true} ,
    department_id: Schema.Types.ObjectId ,
    nickname : {type:String},
    image: { type : String } ,
    role : { type : String },
    gender : { type : String } ,
    birthday : { type : Date } ,
    phone : { type : Number } ,
    generation : { type : Number  } ,
    year : { type : Number },
    other : { type : String } ,
    facebook : { type : String},
    line : { type : String},
    duty : { type : String},
    updated : { type : Date , default : Date.now },
    //TokenEmail
    reset_password_token : { type : String } ,
    reset_password_expires: { type : Date  }

});


var userModel = mongoose.model('User', userSchema)
module.exports = userModel