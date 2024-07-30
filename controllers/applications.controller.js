const applicationsService = require("../services/applications.service");

const applicationsController = {
  createApplication: async (req, res) => {
    const applicationToBeCreated = req.body;

    //TODO data validation

    applicationsService.createApplication(applicationToBeCreated);

    res.status(201).send("Successfully created!");
  },
};

module.exports = applicationsController;
