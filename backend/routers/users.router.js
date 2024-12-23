const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
router.post("/logout", usersController.logoutUser);
router.get("/info", usersController.getInfo);
router.get("/auth-check", usersController.checkAuth);

module.exports = router;