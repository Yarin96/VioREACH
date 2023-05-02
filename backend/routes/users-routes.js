const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");
const dataMining = require("../controllers/data-mining");

const router = express.Router();

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
    res
      .status(200)
      .send({ message: response.message, videoList: response.videoList });
  }
});

module.exports = router;
