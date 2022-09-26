const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user");

router.post("/register", UsersController.create_user);
router.post("/signin", UsersController.user_login);
router.get("/getAll", UsersController.get_users);
module.exports = router;
