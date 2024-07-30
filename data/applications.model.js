const mongoose = require('mongoose');

const ApplicationModel = mongoose.model('Application', 
    {
        id: String,
        user_id: String,
        job_title: String,
        company: String,
        job_link: String,
        status: String,
        date: Date
    }
);

module.exports = ApplicationModel;