// @ts-nocheck

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/UserModel");

// @desc Register User
// @route GET /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, club } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    club,
    role,
  });
  if (!email || !password || !role) {
    return next(
      new ErrorResponse("Passowrd provide an email, password and role", 404)
    );
  }

  const token = user.getSignedJwtToken();

  // check for user
  res.status(200).json({ sucess: true, token: token.token, role: token.role });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials ", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if ((process.env.NODE_ENV = "production")) {
    options.secure = true;
  }
  console.log("kijen ser");

  // localStorae.setItem("user", JSON.stringify(user));
  res
    .status(statusCode)
    .cookie("token", token.token, options)
    .json({ success: true, token: token.token, role: token.role });
};

// @desc Get current logged in user
// @route POST /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    data: user,
  });
});
