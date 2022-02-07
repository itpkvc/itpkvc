const Theme = require('../models/themeModel');
const ThemeImage = require('../models/themeImageModel');
const Chat = require('../models/chatModel');
const Auto = require('../models/autoModel');
const fs = require('fs');
var Objectid = require('mongodb').ObjectID;
exports.insertTheme = async(req,res,next)=>{
    obj = {
        user_id : req.user._id,
        department_id : req.user.department_id,
        auto : req.body.auto,
        subject : req.body.subject,
        material : req.body.material
    }
    var checkAuto = await Auto.findOne({name:req.body.auto})
    if(checkAuto == null){
        Auto.insertMany({
            name : req.body.auto ,
            department_id : req.user.department_id
        })
    }
    Theme.insertMany(obj,(err,data)=>{
        if(err){return res.status(500).send(err)}
        return res.redirect('/themeLocal?id='+data[0]._id)
    })
}
exports.insertThemeImage = (req,res,next) =>{
    var obj = {
       theme_id : req.query.id,
       name : req.file.filename
   }
   ThemeImage.insertMany(obj,(err,data)=>{
       if(err){return res.status(500).send();}
       if(data){
            ThemeImage.find({theme_id : req.query.id},(err,result)=>{
                if(err){return res.status(500).send();}
                return  res.send(result);
           })
       }
   })
}
exports.deleteThemeImage =(req,res,next)=>{
    fs.unlink(process.env.Path_upload+req.body.name, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            ThemeImage.findByIdAndDelete({_id:req.body._id},(err,data)=>{
                return res.send("success");
            })                       
        }
    })
}
exports.findTheme = (req,res,next) =>{
 
    req.user.department_id = new Objectid(req.user.department_id)
    var department
    var auto = {$exists: true}
    if(req.user.role == 'system'){
        department ={$exists: true}
    }else{
        department = req.user.department_id
    }
    if(req.body.auto !== undefined){
        auto = req.body.auto
    }
    Theme.aggregate([
        // {
        //     $match: { department_id: department }
        // },
        { 
            $match: {
                 $and: [ 
                    { department_id: department }, 
                     {auto: auto} 
                 ]
            }
          },
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            },
        },
        {
          $unwind : '$user'
        },
        {
          $lookup: {
            from: "departments",
            localField: "user.department_id",
            foreignField: "_id",
            as: "department"
          }
        },
        {
            $unwind : '$department'
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,data)=>{
        if(err){return res.status(500).send(err);}
        return res.send(data)
    })
    
}
exports.findThemeImage = (req,res,next) =>{
    //console.log(req.body.theme_id)
    req.body.theme_id = new Objectid(req.body.theme_id)
    ThemeImage.find({theme_id:req.body.theme_id},(err,data)=>{
        if(err){return res.status(500).send(err);}
        return res.send(data)
    })
}
exports.myFindTheme = (req,res,next)=>{
    req.user._id = new Objectid(req.user._id)
    Theme.aggregate([
        {
            $match: { user_id: req.user._id }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            },
        },
        {
          $unwind : '$user'
        },
        {
          $lookup: {
            from: "departments",
            localField: "user.department_id",
            foreignField: "_id",
            as: "department"
          }
        },
        {
            $unwind : '$department'
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,data)=>{
        if(err){return res.status(500).send(err);}
        return res.send(data)
    })
}
exports.myDeleteTheme = (req,res,next)=>{
    ThemeImage.find({theme_id:req.body._id},(err,data)=>{
        if(err){return res.status(500).send(err)}
        //console.log(data)
        for (const key of data) {  
            //console.log(`A JavaScript type is: ${key._id}`)
            fs.unlink(process.env.Path_upload+key.name, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    ThemeImage.findByIdAndDelete({_id:key._id},(err)=>{
                        if(err){return res.send(err);}
                    })                       
                }
            })
        }
        Theme.findByIdAndDelete({_id:req.body._id},(err,data)=>{
            if(err){return res.send(err);}
            res.send({message:'deleted'})
        })
    })
}
exports.myInfoTheme = (req,res,next)=>{
    req.body._id = new Objectid(req.body._id)
    Theme.aggregate([
        {
            $match: { _id: req.body._id }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            },
        },
        {
          $unwind : '$user'
        },
        {
          $lookup: {
            from: "departments",
            localField: "user.department_id",
            foreignField: "_id",
            as: "department"
          }
        },
        {
            $unwind : '$department'
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,theme)=>{
        if(err){return res.status(500).send(err);}
        theme._id = new Objectid(theme[0]._id)
        ThemeImage.find({theme_id:theme._id},(err,themeImage)=>{
            if(err){return res.status(500).send(err);}
            //console.log(themeImage);
            //console.log(theme)
            obj = {
                theme : theme,
                themeImage : themeImage
            }
            res.send(obj)
        })
    })
}
exports.myEditTheme = (req,res,next)=>{
    //console.log(req.body)
    req.body._id = new Objectid(req.body._id)
    var obj = {
        subject : req.body.subject,
        material : req.body.material
    }
    Theme.findByIdAndUpdate({_id:req.body._id},obj,(err,data)=>{
        if(err){return res.status(500).send(err);}
        return res.send(data)
    })
}
exports.themForChat = (req,res,next)=>{
    //console.log(req.body)
    req.body.theme_id = new Objectid(req.body.theme_id)
    Theme.aggregate([
        {
            $match: { _id: req.body.theme_id }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            },
        },
        {
          $unwind : '$user'
        },
        {
          $lookup: {
            from: "departments",
            localField: "user.department_id",
            foreignField: "_id",
            as: "department"
          }
        },
        {
            $unwind : '$department'
        },
        { $sort: {  updated: -1 } }
    ]).exec((err,theme)=>{
        if(err){return res.status(500).send(err);}
        theme._id = new Objectid(theme[0]._id)
        ThemeImage.find({theme_id:theme._id},(err,themeImage)=>{
            if(err){return res.status(500).send(err);}
            //console.log(themeImage);
            //console.log(theme)
            obj = {
                theme : theme,
                themeImage : themeImage
            }
            res.send(obj)
        })
    })
}

//system 
exports.deleteTheme = (req,res,next) =>{
    console.log(req.body)
    ThemeImage.find({theme_id:req.body._id},(err,data)=>{
        if(err){return res.status(500).send(err)}
        //console.log(data)
        for (const key of data) {  
            //console.log(`A JavaScript type is: ${key._id}`)
            fs.unlink(process.env.Path_upload+key.name, (err) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    ThemeImage.findByIdAndDelete({_id:key._id},(err)=>{
                        if(err){return res.send(err);}
                    })                       
                }
            })
        }
        Chat.find({theme_id:req.body._id},(err,data)=>{
            if(err){return res.status(500).send(err)}
            for (const key of data){
                console.log(key)
                Chat.findByIdAndDelete({_id:key.    _id},err=>{
                    if(err){return res.status(500).send(err);}
                })
            }
            Theme.findByIdAndDelete({_id:req.body._id},(err,data)=>{
                if(err){return res.send(err);}
                res.send({message:'deleted'})
            })
        })
       
    })
}