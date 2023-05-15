const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");
const dataMining = require("../controllers/data-mining");
const axios = require("axios");

const router = express.Router();

let access_token = "";
const videosUrls = [];

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  (req, res, next) => {
    const mode = req.body.mode;
    if (mode === "signup") {
      usersController.signup(req, res, next);
    } else if (mode === "login") {
      usersController.login(req, res, next);
    } else {
      res.status(400).json({ message: "Invalid mode parameter" });
    }
  }
);

router.get("/", async (req, res, next) => {
  const code = req.query.code;
  if (code) {
    const response = await dataMining.setUpInstagram(code);
    access_token = response.accessToken;
    res.status(200).send({
      message: response.message,
    });
  }
});

router.get("/posts", async (req, res, next) => {
  const fields =
    "id,caption,media_type,media_url,thumbnail_url,timestamp,username";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}`;

  // get data from user account
  const response = await axios.get(url);
  const fetchedData = response.data;
  if (!fetchedData) return console.log("No valid data found.");

  // res.setHeader("Content-Type", "application/json");
  res.status(200).send({ fetchedData: fetchedData });
});

module.exports = router;
