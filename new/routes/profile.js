const express = require("express");
const isAuth = require("../middleware/is-auth");

const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/profile", isAuth, profileController.getProfile); //userId==logged in user

router.get("/publicprofile/:userId", profileController.publicProfile); //userId of the user you want to view

router.post("/follow/:userId", isAuth, profileController.follow); //userId who is being followed

router.post("/updateprofile", isAuth, profileController.updateProfile);

module.exports = router;
