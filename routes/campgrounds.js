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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// CREATE ROUTE
router.post("/", function(req, res){
    // create the campground
    Campground.create(req.body.campground, function(err, newCampground){
        if (err){
            console.log(err);
        } else {
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

module.exports = router;