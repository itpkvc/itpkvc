const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.DB,{
        useUnifiedTopology : true,
        useNewUrlParser : true,
        useCreateIndex : true
    }).then(  console.log('db connected..')).catch(err=> console.log(err))
  
}
module.exports = connectDB;