const Department = require('../models/departModel');
const User = require('../models/userModel');
const fs = require('fs');
const token = require('token') //token 
const crypto = require('crypto');
const bcrypt = require('bcrypt'); // hash password
var Objectid = require('mongodb').ObjectID;

//-------------------------------Department------------------------------------------------
exports.insertDepart = async(req,res,next)=>{
    if(req.body.name == ''){
        return res.redirect('/systemDepart?message=noName')
    }
    const check_depart = await Department.findOne({name:req.body.name})
    if(check_depart != null){
        return res.redirect('/systemDepart?message=duplicate')
    }else{
        Department.insertMany({ name:req.body.name,status:"1"},(err,data) =>{
            if(data){
                return res.redirect('/systemDepart?message=insertSuccess')
            }
        })
    }
}
exports.deleteDepart = (req,res,next)=>{
    var obj = {
        status : "0"
    }
    Department.updateOne({_id:req.params.id},obj,(err,data)=>{
        if(!err,data){
            return res.redirect('/systemDepart?message=deleteSuccess')
        }
    })
}
exports.infoDepart = (req,res,next)=>{
    Department.findById({_id:req.query.id},(err,data)=>{
        if(!err,data){
            return res.send(data)
            
        }
    })
}
exports.editDepart = async(req,res,next) =>{
    //console.log(req.body)
    const check_depart = await Department.findOne({name:req.body.infoname})
    if(check_depart != null){
        return res.redirect('/systemDepart?message=duplicate')
    }else{
        Department.findByIdAndUpdate({_id:req.body.infoid},{name:req.body.infoname},(err,data)=>{
            if(err){
                return res.status(500).send(err);
            }
            return res.redirect('/systemDepart?message=updated')
    
        })
    }
    
}
//-------------------------------Department------------------------------------------------


//--------------------------------------User------------------------------------------------
exports.insertUser = async(req,res,next) =>{
   const {
        idcard, idstudent,email,firstname,lastname,department_id,role ,
        gender,birthday ,phone ,generation ,other ,year,facebook
        ,line,duty,nickname  
  
    } = req.body;
    console.log(req.body)
    const check_idcard = await User.findOne({idcard})
    if(check_idcard !== null){
        return res.redirect('/systemUser?message=D_idcard');
    }
    const check_idstudent = await User.findOne({idstudent});
    if(check_idstudent !== null){
        return res.redirect('/systemUser?message=D_idstudent');     
    } 
    const check_email = await User.findOne({email:email});
    if(check_email !== null) {
        return res.redirect('/systemUser?message=D_email');    
    }
    const check_name = await User.findOne({firstname:firstname,lastname:lastname});
    if(check_name !== null) {
        return res.redirect('/systemUser?message=D_name');    
    } 
  
    var image,password;
    if(req.file === undefined){
        if(gender == 'ชาย'){image = 'man.jpg'};
        if(gender == 'หญิง'){image = 'female.jpg'}
    }else{
        image = req.file.filename
    }
    if(password == undefined){
        password = idcard.toString();
    }
    //hash
    const hash_password = bcrypt.hashSync(password, 10);
    await User.insertMany({
        idcard : idcard ,
        email : email ,
        idstudent : idstudent,
        firstname : firstname  ,
        lastname : lastname, 
        department_id : department_id ,
        role : role,
        gender : gender,
        birthday : birthday,
        phone : phone ,
        generation : generation ,
        other : other,
        password : hash_password ,
        year : year,
        facebook : facebook,
        line : line,
        duty : duty,
        image : image,
        nickname : nickname
  },(err,data)=>{
      //console.log(data)
        if(err) {
             return res.status(500).send(err);
        }else{
             return res.redirect('systemUser?user_id='+data[0]._id)
        }   
  })   
}
exports.insertImage = (req,res,next) =>{
   User.findByIdAndUpdate({_id:req.body.user_id},{image:req.file.filename},
        (err,data)=>{
            if(err){
                return res.status(500).send(err)
            }
            return res.redirect('/systemUser?message=success')
        })
}
exports.deleteUser = (req,res,next) =>{
    //console.log(req.query.id)
    User.findById({_id:req.query.id},(err,data)=>{
        if(err){return res.status(500).send(err)};
        User.deleteOne({_id:req.query.id},(err)=>{
            if(err){return res.status(500).send(err)};
            const name = data.image
            if(name == 'female.jpg' || name == 'man.jpg'){
                return res.redirect('/systemUser?message=Deleted') 
            }
            fs.unlink(process.env.Path_upload+name, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    return res.redirect('/systemUser?message=Deleted')                         
                }
            })
        })
    })
   
}
exports.infoUser = (req,res,next)=>{
   console.log(req.query.id)
    User.findById({_id:req.query.id},(err,info)=>{
        if(err){return res.send(err)}
        if(info){return res.send(info)}
    })
}
exports.editImage = (req,res,next)=>{
    User.findById({_id:req.query.id},(err,data)=>{
        if(err){return res.status(500).send(err)};
        User.findByIdAndUpdate({_id:req.query.id},{image:req.file.filename},(err)=>{
            if(err){return res.status(500).send(err)};
            const name = data.image
            if(name == 'female.jpg' || name == 'man.jpg'){
                return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Update`) ;
            }
            fs.unlink(process.env.Path_upload+name, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Update`);                   
                }
            })
        })
    })
    
}
exports.editInfo = (req,res,next)=>{
  console.log(req.body)  
  console.log(req.query)
  User.findByIdAndUpdate({_id:req.query.id},req.body,(err,data)=>{
      if(err){return res.status(500).send(err);}
      return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Update`);
  })
    
}
exports.editPrimary = async(req,res,next)=>{
    //console.log(req.query.id);
    //console.log(req.body)
    
    var idcard = req.body._Idcard,
        idstudent = req.body._idstudent,
        firstname = req.body._firstname,
        lastname = req.body._lastname,
        email = req.body._email,
        password = req.body._password,
        obj
    if(idcard !== undefined){
        const check_idcard = await User.findOne({idcard:idcard})
        if(check_idcard !== null){
            return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Duplicate`);
        }
        obj = {idcard:idcard}
    }
    if(idstudent !== undefined){
        const check_idstudent = await User.findOne({idstudent:idstudent});
        if(check_idstudent !== null){
            return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Duplicate`);     
        } 
        obj = {idstudent:idstudent}
    }
    if(email !==undefined){
        const check_email = await User.findOne({email:email});
        if(check_email !== null) {
            return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Duplicate`); 
        }
        obj = {email:email}
    }
   if(firstname !== undefined || lastname !== undefined){
        const check_name = await User.findOne({firstname:firstname,lastname:lastname});
        if(check_name !== null) {
            return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Duplicate`);    
        }
        obj = {
            firstname : firstname,
            lastname : lastname
        } 
   }
   if(password !== undefined){
        const hash_password = bcrypt.hashSync(password, 10);
        obj = {
            password : hash_password
        }
   }
   //console.log(obj)
   User.findByIdAndUpdate({_id:req.query.id},obj,(err,data)=>{
       if(err){return res.status(500).send(err);}
       return res.redirect(`/systemEditUserPage?id=${req.query.id}&message=Update`);
   })   
}
//info to left menu
exports.infoLeft = (req,res,next) =>{
    User.findById({_id:req.user._id},(err,data)=>{
        if(err){return res.status(500).send(err)}
        return res.send(data)
    })
}