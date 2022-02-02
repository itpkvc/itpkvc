var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const User = require('../models/userModel');
const passport = require('passport');
const authController = require('../controllers/authController');
const newsController = require('../controllers/newsController');
const pageController = require('../controllers/pageController');
const userController = require('../controllers/userController');
const themeController = require('../controllers/themeController');
const authMiddleware = require('../middlewares/authMiddleware');
const Theme = require('../models/themeModel');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.Path_upload);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

/* GET and Post home page. */
router.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
});
router.get('/',authMiddleware.isLoggedAll, pageController.index)
router.get('/forgot',authMiddleware.isLoggedAll,pageController.forgot)
router.get('/reset',authMiddleware.isLoggedAll,pageController.reset)
router.get('/logout',pageController.logout)
router.post('/login',passport.authenticate('local', { failureRedirect: '/?message=loginFail' }),authController.passport);
router.post('/forgot_pw', authController.forgot )
router.post('/reset_pw', authController.reset_password)
// Local page in login
router.get('/themeLocal',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.themeLocal);
router.post('/insertTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.insertTheme);
router.post('/insertThemeImage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,upload.single("image"),themeController.insertThemeImage);
router.post('/deleteThemeImage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.deleteThemeImage);
router.get('/findTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.findTheme);
router.post('/findThemeImage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.findThemeImage);
router.get('/myThemeLocal',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.myThemeLocal);
router.get('/myFindTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.myFindTheme);
router.post('/myInfoTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.myInfoTheme);
router.post('/myEditTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.myEditTheme);
router.get('/chat',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.chat);
router.post('/themForChat',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.themForChat);
router.post('/DeleteTheme',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,themeController.deleteTheme);
// send info to Left menu 
router.post('/InfoLeft',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.infoLeft)
/* GET and Post System. */
router.post("/edit_image",authMiddleware.isLoggedLocal,authMiddleware.WhereDB,upload.single("image"),newsController.edit_image);
router.get('/news_info',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.news_info);
router.get('/gen',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.gen);
router.get('/news_read',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.news_read);
router.get('/news_show',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.news_show);
router.get('/news',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.news);
router.get('/news_',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.news_);
router.get('/systemIndex',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.systemIndex);
router.get('/systemDepart',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.systemDepart);
router.get('/systemUser',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.systemUser);
router.get('/systemEditUserPage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.systemEditUser);
router.get('/systemThemeLocal',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,pageController.systemThemeLocal);

router.get('/news_delete/:id',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,newsController.delete_news);
router.post('/insert_news',authMiddleware.isLoggedLocal,authMiddleware.WhereDB, upload.single("image"),newsController.insert_news)
router.post('/update_news',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,newsController.update_news)
router.post('/systemInsertDepart',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.insertDepart);
router.get('/systemDeleteDepart/:id',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.deleteDepart);
router.post('/systemInfoDepart',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.infoDepart);
router.post('/systemEditDepart',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.editDepart);
router.post('/systemInsertUser',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.insertUser);
router.post('/systemInsertImage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,upload.single("image"),userController.insertImage);
router.get('/systemDeleteUser',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.deleteUser);
router.post('/systemInfoUser',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.infoUser);
router.post('/systemEditImage',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,upload.single("image"),userController.editImage);
router.post('/systemEditInfo',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.editInfo)
router.post('/systemEditPrimary',authMiddleware.isLoggedLocal,authMiddleware.WhereDB,userController.editPrimary)

router.get('/adminIndex',authMiddleware.isLoggedAdmin,authMiddleware.WhereDB,pageController.adminIndex);
router.get('/userIndex',authMiddleware.isLoggedUser,authMiddleware.WhereDB,pageController.userIndex);

  
module.exports = router;
