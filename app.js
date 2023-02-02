const express = require("express");
const emailsender = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const emailSendRoute = require("./email/send-email");

//middleware
emailsender.use(morgan("dev")); // Morgan is a logger middleware
emailsender.use(bodyParser.urlencoded({ extended: false }));
emailsender.use(bodyParser.json());
//routes
emailsender.use("/send", emailSendRoute);

emailsender.use((req, res, next) => {
  const error = new Error("Not found");
  // error.status(404);
  error.status = 404;
  next(error);
});
emailsender.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    errorResponse: {
      message: error.message,
    },
  });
});

module.exports = emailsender;
