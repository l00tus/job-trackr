const ApplicationModel = require("../data/applications.model");
const { v4: uuidv4 } = require("uuid");

const applicationsService = {
  getApplicationsOfUser: async (user_id) => {
    const applications = await ApplicationModel.find({ user_id: user_id }, {_id: 0, id: 0, user_id: 0})

    return applications;
  },
  createApplication: async (applicationObject) => {
    applicationObject.id = uuidv4();
    const newApplication = new ApplicationModel(applicationObject);
    try {
      return await newApplication.save();
    } catch (error) {
      throw error;
    }
  },
  deleteApplicationByID: async (id) => {
    const response = await ApplicationModel.deleteOne({ id: id });

    return response;
  },
};

module.exports = applicationsService;
