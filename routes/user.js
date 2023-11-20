const express =require("express");
const router = express.Router({mergeParams:true});

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/user.js");

//signup form and create routes
router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(userController.createUser);



//loginform and login
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/user/login",failureFlash:true}),userController.loginUser);

//logout
router.get("/logout",userController.logoutUser);

module.exports=router;
