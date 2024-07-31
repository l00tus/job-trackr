const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applications.controller");

router.get("/:id", applicationsController.getApplicationByID);
router.post("/", applicationsController.createApplication);

module.exports = router;