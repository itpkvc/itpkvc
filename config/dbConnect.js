const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;