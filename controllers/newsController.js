const News = require("../models/newsModel");
const fs = require('fs');
exports.delete_news = (req,res)=>{
    console.log(req.params)
    News.findByIdAndDelete({_id:req.params.id},
        (err,data)=>{
            if(err){
                return res.status(500).send(err)
            }else{
                return res.redirect('/news_show?message=success')
            }
        })
}
exports.edit_image = (req,res,next) =>{
    
    News.findByIdAndUpdate({
        _id : req.query._id
    },{
        image_name : req.file.filename
    },
    (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        fs.unlink(process.env.Path_upload + data.image_name, (err) => {
            if (err) {
              console.log("failed to delete local image:" + err);
            } else {
                res.send({message:'imaged'})
            }
          })
    })
}
exports.insert_news = (req,res)=>{
    console.log(req.body)
    News.insertMany({
        name : req.body.name_ ,
        user_id : req.user._id ,
        image_name : req.file.filename ,
        department_id : req.body.department ,
        detail : req.body.detail,
    },(err,data)=>{
        if(err){
            if(err.code == 11000){
                fs.unlink(process.env.Path_upload + req.file.filename, (err) => {
                    if (err) {
                      console.log("failed to delete local image:" + err);
                    } else {
                        return res.redirect('/news_show?message=duplicate')
                    }
                  })
            }else{
                return res.status(500).send(err)
            }     
        }
        if(data){
            return res.redirect('/news_show?message=success')
        }
    })
}
exports.update_news = (req,res)=>{
    //console.log(req.body)
    News.findByIdAndUpdate(
        {
            _id : req.query._id
        },{
            name : req.body.name_ ,
            user_id : req.user._id ,
            department_id : req.body.department ,
            detail : req.body.detail,
        },(err,data)=>{
            if(err){
                if(err.code == 11000){
                    fs.unlink(process.env.Path_upload + req.file.filename, (err) => {
                        if (err) {
                        console.log("failed to delete local image:" + err);
                        } else {
                            return res.redirect('/news_show?message=duplicate')
                        }
                    })
                }else{
                    return res.status(500).send(err)
                }     
            }
            if(data){
                return res.redirect('/news_show?message=success')
            }
        })
}