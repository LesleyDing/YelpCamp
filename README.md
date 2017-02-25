#YelpCamp


##Initial Setup (built in v1)
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

##Layout and Basic Styling (built in v1)
* Create our header and footer partials
* Add in Bootstrap

##Creating New Campgrounds (built in v1)
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the campgrounds page (built in v1)
* Add a better header/title
* Make campgrounds display in a grid

##Style the Navbar and Form (built in v1)
* Add a navbar to all templates
* Style the new campground form

##Add Mongoose (update in v2)
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

##Show Page (update in v2)
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code (update in v3)
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File (update in v3)
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model! (update in v3)
* Make our errors go away!
* Display comments on campground show page

##Comment New/Create (update in v3)
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page (update in v3)
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page (update in v3)
* Add public directory
* Add custom stylesheet


#RESTFUL ROUTES
name      url                          verb    desc.
===============================================================================================
INDEX   /campgrounds                   GET   Display a list of all campgrounds
NEW     /campgrounds/new               GET   Displays form to make a new campground
CREATE  /campgrounds                   POST  Add new campground to DB
SHOW    /campgrounds/:id               GET   Shows info about one campground
NEW     /campgrounds/:id/comments/new  GET   Add new comment of a campground to DB
CREATE  /campgrounds/:id/comments      POST  Shows the comments in the campground's show route