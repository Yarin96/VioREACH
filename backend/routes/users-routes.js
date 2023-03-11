const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");

const router = express.Router();

// router.get("/", usersController.getUsers);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  (req, res, next) => {
    const mode = req.body.mode;
    console.log(mode, "tell me whyy");
    if (mode === "signup") {
      usersController.signup(req, res, next);
    } else if (mode === "login") {
      usersController.login(req, res, next);
    } else {
      res.status(400).json({ message: "Invalid mode parameter" });
    }
  }
);

// router.post("/login", usersController.login);

module.exports = router;
