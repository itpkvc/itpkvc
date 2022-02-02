const User = require('../models/userModel'); //Model DB
const Department = require('../models/departModel');
const authMiddleware = require('../middlewares/authMiddleware');
const session = require('express-session');
var Objectid = require('mongodb').ObjectID;
exports.index=async(req,res,next)=>{
    var message = req.query.message
    res.render('index', {message});
}
exports.logout=(req,res,next)=>{
    req.logout();
    res.redirect('/');
}
exports.forgot=(req,res,next)=>{
    var message = req.query.err
    res.render('forgot',{message});
}
exports.reset=async(req,res,next)=>{
    var message = req.query.token
    var err = req.query.err
    //console.log(message )
    const check_token = await User.findOne({
        reset_password_token : message,
        reset_password_expires : {
              $gt: Date.now()
            }
    })
    if(check_token == null){
        return res.redirect('/forgot')
    }
    return res.render('reset',{message,err});
}

//-------------------------------------------------------system------------------------------

exports.systemIndex=async(req,res,next)=>{
    res.render('systemIndex');
}
exports.systemDepart=(req,res,next)=>{
    var message = req.query.message
    Department.find({status : "1"}).sort({ updated: -1 }).exec((err,data)=>{
        if(err) throw err;
        res.render('systemDepart',{message,data})
    })
  
}
exports.systemUser=(req,res,next)=>{
    var message = req.query.message
    var user_id = req.query.user_id
    console.log(user_id)
    User.aggregate([
        {
            "$lookup": {
                "from": "departments",
                "localField": "department_id",
                "foreignField": "_id",
                "as": "department"
            },
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,users)=>{
        if(err){return res.status(500).send(err);}
        //console.log(users)
        Department.find({status : "1"}).sort({ updated: -1 }).exec((err,data)=>{
            if(err){
                return res.status(500).send(err);
            }
           // console.log(users)
            res.render('systemUser',{data,message,users,user_id});
        })
    });
    
   
}
exports.systemEditUser= async(req,res,next)=>{
    //console.log(req.query)
    var message = req.query.message;
    var department = await  Department.find({status : "1"}).sort({ updated: -1 });
    //console.log(department)
    User.findById({_id:req.query.id},(err,data)=>{
        if(err){return res.status(500).send(err)};
        return res.render('systemUserEdit',{infoEdit:data,department:department,message});
    })   
}
exports.systemThemeLocal = (req,res,next)=>{
    var them_id = req.query.id
    res.render('systemThemeLocal',{
        them_id
    })
}
//-------------------------------------------------------local------------------------------

exports.themeLocal = (req,res,next) => {
    var them_id = req.query.id
    res.render('themeLocal',{
        them_id
    });
}
exports.myThemeLocal = (req,res,next) =>{
    var them_id = req.query.id
    message = req.query.message
    res.render('themeLocalById',{
        message,
        them_id
    })
}
exports.chat = (req,res,next)=>{
    //console.log(req.query)
    req.user._id = new Objectid(req.user._id)
    //console.log(req.user._id)
    User.aggregate([
        {
            $match: { _id: req.user._id }
        },
        {
            "$lookup": {
                "from": "departments",
                "localField": "department_id",
                "foreignField": "_id",
                "as": "department"
            },
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,data)=>{
        //console.log(data)
        var user = data[0]
       
        if(err){return res.status(500).send(err);}
        var theme_id = req.query.idTheme
        res.render('chat',{
            theme_id,
            user
        })
    })
   
}
//-------------------------------------------------------------------------------------------
exports.adminIndex=(req,res,next)=>{
    res.render('adminIndex');
}
exports.userIndex=(req,res,next)=>{
    res.render('userIndex');
}