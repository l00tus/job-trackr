const applicationsService = require("../services/applications.service");

const applicationsController = {
  getApplicationsOfUser: async (req, res) => {
    const user_id = req.params.user_id;

    const applications = await applicationsService.getApplicationsOfUser(user_id);

    if (applications) {
      res.status(200).send(applications);
    } else {
      res.status(404).send({ error: "No applications were found for the provided user_id!" });
    }
  },
  createApplication: async (req, res) => {
    const applicationToBeCreated = req.body;

    if(!applicationToBeCreated.job_title || !applicationToBeCreated.company || !applicationToBeCreated.location || !applicationToBeCreated.status) {
      return res.status(400).send({ error: "Job title, company, location and status are required!" });
    }

    try {
      newApplication = await applicationsService.createApplication(applicationToBeCreated);

      res.status(201).send({ "message": "Application created successfully", "application": newApplication });
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  },
  deleteApplicationByID: async (req, res) => {
    const id = req.params.id;

    const response = await applicationsService.deleteApplicationByID(id);

    if(response.deletedCount == 0) {
      res.status(404).send({ error: "No applications with the given ID was found" });
    } else {
      res.status(204).send();
    }
  }
};

module.exports = applicationsController;
