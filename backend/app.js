const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const https = require("https");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const privateKey = fs.readFileSync(__dirname + "/certificates/key.pem", "utf8");
const certificate = fs.readFileSync(
  __dirname + "/certificates/cert.pem",
  "utf8"
);

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

app.use("/auth", usersRoutes);

app.use("/detection", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

httpsServer.listen(8443);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vidoh7c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
