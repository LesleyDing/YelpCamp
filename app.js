var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    seedDB    = require("./seeds"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    // User       = require("./models/user");
    
// app config
mongoose.connect("mongodb://localhost/YelpCampV3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB(); // run the function from the seeds file

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

// NEW COMMENTS ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

// CREATE ROUTE
app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});
