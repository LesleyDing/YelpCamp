var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
    res.render("home");
});

/*######################*\
##                      ##
##      AUTH Routes     ##
##                      ##
\*######################*/

/*SIGN UP ROUTES*/
//show sign up form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
        });
    });
});

/* LOGIN ROUTES */
//render login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic --> app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

/* LOGOUT ROUTES */
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// middleware for checking login status
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;