// requiring packages
var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

// requiring db models
var Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user");

// requiring routes
var indexRoutes     = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

// APP CONFIG
var url =process.env.DATABASEURL || "mongodb://localhost/YelpCampV8";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Lesley is the smartest husky in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// creating globle varible
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// set up routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});