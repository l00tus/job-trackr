const { application } = require("express");
const ApplicationModel = require("../data/applications.model");
const { v4: uuidv4 } = require("uuid");

const applicationsService = {
  getApplicationsOfUser: async (user_id) => {
    const applications = await ApplicationModel.find({ user_id: user_id }, {_id: 0, user_id: 0})

    return applications;
  },
  createApplication: async (applicationObject) => {
    applicationObject.id = uuidv4();
    applicationObject.status_history = [{
      status: applicationObject.status,
      date: new Date(),
    }];

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
  updateApplicationByID: async (id, updatedApplication) => {
    const application = await ApplicationModel.findOne({ id: id });

    if(!application) {
      return null;
    }

    if(updatedApplication.status && updatedApplication.status !== application.status) {
      application.status_history.push(
        {
          status: updatedApplication.status,
          date: new Date(),
        },
      );
    }

    Object.assign(application, updatedApplication);

    try {
      return await application.save();
    } catch (error) {
      throw error;
    }
  }
};

module.exports = applicationsService;
