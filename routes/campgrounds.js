var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");


/*##################################*\
##                                  ##
##    RESTful Campgrounds Routes    ##
##                                  ##
\*##################################*/

// INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index", {campgrounds:campgrounds});
       }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    // create the campground
    Campground.create(req.body.campground, function(err, newCampground){
        if (err){
            console.log(err);
        } else {
            // add username and id to campground
            newCampground.author.id = req.user._id;
            newCampground.author.username = req.user.username;
            newCampground.save(); // save the campground
            res.redirect("/campgrounds/" + newCampground._id); //redirect to the index
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res) {
    // find the campground and display in the show.ejs
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    // find the campground displayed in the show.ejs
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });    
})

// DESDROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;