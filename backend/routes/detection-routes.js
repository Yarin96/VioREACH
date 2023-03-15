const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/detection", (req, res, next) => {
  res.send("Entered the detection page.");
});

module.exports = router;