const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const multer  = require('multer');
const listingController=require("../controllers/listing.js");

const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


//Index and create
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing))
    
//new Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show Route and Update route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));


module.exports = router;