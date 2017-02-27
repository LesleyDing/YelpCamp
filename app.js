var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    seedDB                = require("./seeds"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user");
    
// APP CONFIG
mongoose.connect("mongodb://localhost/YelpCampV4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB(); // run the function from the seeds file

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

/*######################*\
##                      ##
##    RESTful Routes    ##
##                      ##
\*######################*/

// LANDING PAGE
app.get("/", function(req, res){
    res.render("home");
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:campgrounds});
       }
    });
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res){
    // create the campground
    Campground.create(req.body.campground, function(err, newCampground){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //redirect to the index
        }
    });
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
    // find the blog and display in the show.ejs
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log(campground);
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

/*######################*\
##                      ##
##    COMMENTS Routes   ##
##                      ##
\*######################*/

// NEW COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

// CREATE COMMENT ROUTE
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            // create the comment
            Comment.create(req.body.comment, function(err, newComment){
                if (err){
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    console.log(newComment)
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id); //redirect to the index
                }
            });
        }
    })
    
});

/*######################*\
##                      ##
##      AUTH Routes     ##
##                      ##
\*######################*/

/*SIGN UP ROUTEs*/
//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up logic
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic --> app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

/* LOGOUT ROUTES */
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// check login status
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});
