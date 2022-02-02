const bcrypt = require('bcrypt'); // hash password
const nodemailer = require('nodemailer'); //sent email
const User = require('../models/userModel'); //Model DB
const token = require('token') //token 
const crypto = require('crypto');
const design_email = require('../config/designEmail/html_email');
const { request } = require('express');

exports.passport = ( req , res ) => {
    if(req.user.role == 'system'){
        res.redirect('/systemIndex')  
    }else if(req.user.role == 'admin'){
         res.redirect('/adminIndex')  
    }else if(req.user.role == 'user'){
        res.redirect('/userIndex')  
    }else{
        res.redirect('/') 
    }      
}
exports.forgot = async( req , res ) => {
    console.log(req.body)
    var send_email = req.body.send_email

    var check_id = await User.findOne({idcard : send_email});

    var check_email = await User.findOne({email : send_email});

    if( check_email == null && check_id == null){
        var message = 'fail'
        res.redirect('/forgot?err='+message )
    }
    if(check_id !== null){
          send_email = check_id
          //console.log( send_email )
    }else{
          send_email = check_email
          //console.log( send_email )
    }
    //Random Token
    var token = crypto.randomBytes(32).toString('hex');
    //console.log(token)
    await User.findByIdAndUpdate({_id : send_email._id},{
          reset_password_token : token ,
          reset_password_expires : Date.now() + 86400000
    })
    
    let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, 
          auth: {
            user: process.env.Email,
            pass: process.env.Password 
          }
         });
         
         // เริ่มทำการส่งอีเมล
         let info = await transporter.sendMail({
         from: 'วิทยาอาชีวศึกษาภูเก็ต <'+send_email.email+'>', 
         to: send_email.email,
         subject: 'ขอเปลี่ยนรหัสผ่าน', 
         text: '', 
         attachments : [
                {     
                filename: 'loginLogo.png' , 
                path : 'public/images/loginLogo.png',
                cid : 'logo'
                }
         ],
         html: 
         design_email.html_top+
         `<a href="${process.env.Send_reset_font_end}?token=${token}"
         style="background-color: brown;
         border-radius: 10px;
         padding: 15px;
         text-decoration: none;
         color: white;
         "
         > กดเพื่อเปลี่ยนรหัสผ่านของท่าน</a>`+
         design_email.html_bottom
         }).then(data =>{
                console.log('Message sent: %s', data.messageId); 
                var message = 'success'
                return res.redirect('/forgot?err='+message )
         });
         
             
}
exports.reset_password = async( req ,res) =>{

   const {token,password} = req.body
   const check_token = await User.findOne({
         reset_password_token : token,
         reset_password_expires : {
               $gt: Date.now()
             }
   })
   if(check_token == null){
        var message = "noToken"
        return res.redirect('/reset?err='+message)
   }
   await User.findOne({
         reset_password_token : token,
         reset_password_expires : {
               $gt: Date.now()
             }
   }).exec((err,user)=>{
         if(!err && user){
               user.password = bcrypt.hashSync(password, 10);
               user.reset_password_token = undefined;
               user.reset_password_expires = undefined;
               user.save((err,data)=>{
                    if(!err&&data){return res.redirect('/')}
               })
         }
   })
}

