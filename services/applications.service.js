const ApplicationModel = require("../data/applications.model");
const { v4: uuidv4 } = require("uuid");

const applicationsService = {
  getApplicationByID: async (id) => {
    const application = await ApplicationModel.findOne(
      { id: id },
      { _id: 0, id: 0, user_id: 0, __v: 0 }
    );

    return application;
  },
  createApplication: (applicationObject) => {
    applicationObject.id = uuidv4();
    const newApplication = new ApplicationModel(applicationObject);
    return newApplication
      .save()
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = applicationsService;
