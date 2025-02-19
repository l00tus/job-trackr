const mongoose = require("mongoose");

const ApplicationModel = mongoose.model("Application", {
  id: String,
  user_id: String,
  job_title: String,
  company: String,
  location: String,
  job_link: String,
  status: String,
  status_history: [
    {
      status: String,
      date: { type: Date, default: Date.now },
    },
  ],
  date: Date,
});

module.exports = ApplicationModel;
