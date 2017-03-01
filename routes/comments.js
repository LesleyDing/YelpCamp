var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");

/*######################*\
##                      ##
##    COMMENTS Routes   ##
##                      ##
\*######################*/

// NEW COMMENT ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    // add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save(); // save the comment
                    campground.comments.push(newComment); // save the comments to the campground
                    campground.save(); // save the campground
                    res.redirect('/campgrounds/' + campground._id); //redirect to the index
                }
            });
        }
    })
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    // find the comment displayed in the show.ejs
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });    
})

// DESDROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;