const express = require("express");
const isAuth = require("../middleware/is-auth");

const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/profile", isAuth, profileController.getUser); //userId==logged in user

router.post("/follow/:userId", isAuth, profileController.follow); //userId who is being followed

module.exports = router;
