var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");

/*######################*\
##                      ##
##    COMMENTS Routes   ##
##                      ##
\*######################*/

// NEW COMMENT ROUTE
router.get("/new", isLoggedIn, function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
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

// middleware for checking login status
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;