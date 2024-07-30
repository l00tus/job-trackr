require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const port = 3000;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

//Routes
const applicationsRouter = require("./routers/applications.router");

app.use("/applications", applicationsRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}!`);

  mongoose
    .connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster.wanx9kn.mongodb.net/job-trackr?retryWrites=true&w=majority&appName=cluster`
    )
    .then(() => {
      console.log("Successfully connected to the database!");
    })
    .catch((err) => {
      console.log(err);
    });
});
