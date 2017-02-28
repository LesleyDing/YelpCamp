var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground");


/*######################*\
##                      ##
##    RESTful Routes    ##
##                      ##
\*######################*/

// INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:campgrounds});
       }
    });
});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    // create the campground
    Campground.create(req.body.campground, function(err, newCampground){
        if (err){
            console.log(err);
        } else {
            // add username and id to campground
            newCampground.author.id = req.user._id;
            newCampground.author.username = req.user.username;
            newCampground.save(); // save the campground
            res.redirect("/"); //redirect to the index
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res) {
    // find the blog and display in the show.ejs
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

// middleware for checking login status
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;