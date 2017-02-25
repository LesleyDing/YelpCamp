var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/YelpCampV2");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

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
          res.render("index",{campgrounds:campgrounds});
       }
    });
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res){
    // create the campground
    Campground.create(req.body.campground, function(err, newCampground){
        if (err){
            console.log("error!");
        } else {
            res.redirect("/campgrounds"); //redirect to the index
        }
    });
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
    // find the blog and display in the show.ejs
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("error!");
            res.redirect("/campgrounds");
        } else {
            res.render("show", {campground: campground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});
