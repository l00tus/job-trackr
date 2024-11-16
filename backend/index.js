require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors({
  origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
  credentials: true
}))
app.use(cookieParser());

const port = 3000;

//Routes
const applicationsRouter = require("./routers/applications.router");
const usersRouter = require("./routers/users.router");

app.use("/api/applications", applicationsRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}!`);

  mongoose
    .connect(
      process.env.DB_URI
    )
    .then(() => {
      console.log("Successfully connected to the database!");
    })
    .catch((err) => {
      console.log(err);
    });
});
