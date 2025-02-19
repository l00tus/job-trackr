const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applications.controller");

router.get("/:user_id", applicationsController.getApplicationsOfUser);
router.post("/", applicationsController.createApplication);
router.delete("/:id", applicationsController.deleteApplicationByID);
router.put("/:id", applicationsController.updateApplicationByID);

module.exports = router;
