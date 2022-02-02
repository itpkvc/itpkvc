var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const passport = require('passport');
const authController = require('../controllers/authController');
const pageController = require('../controllers/pageController');
const userController = require('../controllers/userController');
const themeController = require('../controllers/themeController');
const authMiddleware = require('../middlewares/authMiddleware');
const Theme = require('../models/themeModel');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload");
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
router.get('/systemIndex',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,pageController.systemIndex);
router.get('/systemDepart',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,pageController.systemDepart);
router.get('/systemUser',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,pageController.systemUser);
router.get('/systemEditUserPage',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,pageController.systemEditUser);
router.get('/systemThemeLocal',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,pageController.systemThemeLocal);


router.post('/systemInsertDepart',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.insertDepart);
router.get('/systemDeleteDepart/:id',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.deleteDepart);
router.post('/systemInfoDepart',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.infoDepart);
router.post('/systemEditDepart',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.editDepart);
router.post('/systemInsertUser',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.insertUser);
router.post('/systemInsertImage',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,upload.single("image"),userController.insertImage);
router.get('/systemDeleteUser',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.deleteUser);
router.post('/systemInfoUser',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.infoUser);
router.post('/systemEditImage',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,upload.single("image"),userController.editImage);
router.post('/systemEditInfo',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.editInfo)
router.post('/systemEditPrimary',authMiddleware.isLoggedSystem,authMiddleware.WhereDB,userController.editPrimary)

router.get('/adminIndex',authMiddleware.isLoggedAdmin,authMiddleware.WhereDB,pageController.adminIndex);
router.get('/userIndex',authMiddleware.isLoggedUser,authMiddleware.WhereDB,pageController.userIndex);

  
module.exports = router;
