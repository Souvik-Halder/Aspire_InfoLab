const express=require('express');
const {  googleProfile, userGoogleLogin, loginUser, registerUser, loginSuccess, logoutUser, updateUserRole } = require('../controllers/authController');
const isAuth = require('../middlewares/isAuth');
const router=express.Router();




//Google Login  
router.route('/google').get(googleProfile)
router.route('/google/callback').get(userGoogleLogin);
router.route('/logout').post(logoutUser);



//local login and register
router.route('/local-login').post(loginUser);
router.route('/local-register').post(registerUser)


router.route('/update-role').patch(isAuth,updateUserRole)
router.route('/login/success').get(isAuth,loginSuccess)

module.exports=router