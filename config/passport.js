const bcrypt = require('bcryptjs'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../models/userModel');
      
    passport.use(new LocalStrategy(async(username, password, done) => { 
   
      var check_id = await User.findOne({idcard : username});
      if (check_id !== null){
            User.findOne({idcard: username}).then(function(user){
              if(!user || !bcrypt.compareSync(password, user.password)){
                return done(null, false, {errors: {'email or password': 'is invalid'}})
              }
            return done(null, user)
        }).catch(done)
      }else{
          User.findOne({email: username}).then(function(user){
            if(!user || !bcrypt.compareSync(password, user.password)){
              return done(null, false, {errors: {'email or password': 'is invalid'}})
            }
          return done(null, user)
     }).catch(done)
      }

  }))

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
 

