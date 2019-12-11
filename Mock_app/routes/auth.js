const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

router.post('/signup', authController.postSignup);

router.get('/', authController.getSignup);


module.exports = router;