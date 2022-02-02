const session = require('express-session')
const User = require('../models/userModel'); //Model DB
var Objectid = require('mongodb').ObjectID
exports.isLoggedSystem = (req, res, next) => {
    //console.log(req.user)
    if (req.isAuthenticated() && req.user.role == 'system') {
      next()
    } else {
      res.redirect('/')
    }
}
exports.isLoggedUser = (req, res, next) => {
    //console.log(req.user)
    if (req.isAuthenticated() && req.user.role == 'user') {
      next()
    } else {
      res.redirect('/')
    }
}
exports.isLoggedAdmin = (req, res, next) => {
   //console.log(req.user)
    if (req.isAuthenticated() && req.user.role == 'admin') {
      next()
    } else {
      res.redirect('/')
    }
}
exports.isLoggedLocal = (req,res,next) =>{
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/')
    }
}
exports.isLoggedAll = async(req, res, next) => {
    var user = req.user
    if(user){
      await User.find({_id:user._id},(err,data)=>{
        var role = data[0].role
        //console.log(role)
        if(role == 'system'){
          res.redirect('/systemIndex')
        }
        if(role == 'admin'){
          res.redirect('/adminIndex')
        }
        if(role == 'user'){
          res.redirect('/userIndex')
        }
        next()
      })
    }
    next()   
}
exports.WhereDB = async(req,res,next)=>{
  const check = await User.findById({_id:req.user._id})
    if(check == null){
       res.redirect('/logout')
    }
  next();
    
}