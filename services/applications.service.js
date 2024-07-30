const ApplicationModel = require("../data/applications.model");
const { v4: uuidv4 } = require('uuid');

const applicationsService = {
  createApplication: (applicationObject) => {
    applicationObject.id = uuidv4();
    const applicationToBeCreated = new ApplicationModel(applicationObject);
    applicationToBeCreated
      .save()
      .then(() => {
        console.log("Application created successfully!");
      })
      .catch((error) => {
        console.log("Error creating application", error);
      });
  },
};

module.exports = applicationsService;
