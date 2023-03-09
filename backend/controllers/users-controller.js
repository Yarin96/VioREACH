const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    const errorThrown = new HttpError(
      "Fetching users failed, please try again later",
      500
    );
    return next(errorThrown);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please recheck your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const errorThrown = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(errorThrown);
  }

  if (existingUser) {
    const errorThrown = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(errorThrown);
  }

  const createdUser = new User({
    name,
    email,
    password,
    expenses: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    const errorThrown = new HttpError(
      "Signing up failed, please try again.",
      500
    );
    return next(errorThrown);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const errorThrown = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(errorThrown);
  }

  if (!existingUser || existingUser.password !== password) {
    const errorThrown = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(errorThrown);
  }

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
