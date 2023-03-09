const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, "s4cr3tVioL4nc34pp");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const errorThrown = new HttpError("Authentication failed!", 401);
    return next(errorThrown);
  }
};
