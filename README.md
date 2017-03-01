#YelpCamp

##Initial Setup (built in v1)
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

##Layout and Basic Styling (built in v1)
* Create our header and footer partials
* Add in Bootstrap

###Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##Create New Campgrounds (built in v1)
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

###Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

##Add Mongoose (updated in v2)
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

##Show Page (updated in v2)
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code (updated in v3)
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Comments (updated in v3)
###Add Comment model
* Define Comment model
* Display comments on campground show page

###Comment New/Create (updated in v3)
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page (updated in v3)
* Add sidebar to show page
* Display comments nicely
* Add public directory
* Add custom stylesheet

##Authentication (updated in v4)
###Add User Model
* Install all packages needed for auth
* Define User model

###Register
* Configure Passport
* Add register routes
* Add register template

###Login
* Add login routes
* Add login template

###Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

###Show/Hide Links
* Show/hide auth links in navbar correctly

##Refactor The Routes (updated in v5)
* Use Express router to reoragnize all routes

##User Associations (updated in v6)
###Users add Comments
* Associate users and comments
* Save author's name to a comment automatically

###Users add Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

##Edit/Delete Campgrounds and Comments with Authorization (updated in v7)
###Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

###Deleting Campgrounds
* Add Destroy Route
* Add Delete button

###Authorization for Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

###Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

###Deleting Comments
* Add Destroy route
* Add Delete button

###Authorization for Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

##UI Improvements (updated in v8)
###Adding in Flash
* Install and configure connect-flash
* Add bootstrap alerts to header

###Adding a Landing Page
* Add a animation of images

###Adding Dynamic Price Feature
* Add price to campground model as a Number datatype
* Add price to views/campgrounds/new.ejs and views/campgrounds/edit.ejs
* Add price to views/campgrounds/show.ejs

--------------------------------------------------------------------------
##Deploying
* Upload files to Heroku
* Connect mongoose to mlab

--------------------------------------------------------------------------
##Customized Features (tbc)