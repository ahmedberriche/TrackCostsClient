const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user");

router.post("/register", UsersController.create_user);
router.post("/signin", UsersController.user_login);

module.exports = router;