const User=require("../models/user.js");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.createUser=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        let registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to Wanderlust");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/user/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.loginUser=async (req,res)=>{
    req.flash("success","Welcome back to wanderlust!");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success","logged out successfully");
            res.redirect("/listings");
        }
    });
}