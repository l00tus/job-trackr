const applicationsService = require("../services/applications.service");

const applicationsController = {
  getApplicationByID: async (req, res) => {
    const id = req.params.id;

    const application = await applicationsService.getApplicationByID(id);

    if (application) {
      res.status(200).send(application);
    } else {
      res.status(404).send({ error: "No applications with the given ID was found" });
    }
  },
  createApplication: async (req, res) => {
    const applicationToBeCreated = req.body;

    //TODO data validation
    try {
      newApplication = await applicationsService.createApplication(applicationToBeCreated);

      res.status(201).send({ "message": "Application created successfully", "application": newApplication });
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  },
};

module.exports = applicationsController;
