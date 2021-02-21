// @ts-nocheck
console.log("-----------------------");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/UserModel");
const Clubs = require("../models/ClubsModel");
const accountModel = require("../models/accountModel");

// @desc Register User
// @route GET /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, clubID } = req.body;
  console.log(clubID);
  const userData = {};
  if (!clubID) {
    userData.name = name;
    userData.email = email;
    userData.password = password;
    userData.role = role;
  } else {
    userData.name = name;
    userData.email = email;
    userData.password = password;
    userData.role = role;
    userData.clubID = clubID;
  }
  console.log(userData);

  const user = await User.create(userData);

  if (!email || !password || !role) {
    return next(
      new ErrorResponse("Password provide an email, password and role", 404)
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
  const user = await accountModel.findOne({ email }).select("+password");

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
  const user = await User.findById(req.user.id).populate("clubname");
  res.status(200).json({
    sucess: true,
    data: user,
  });
});

exports.getClubsName = asyncHandler(async (req, res, next) => {
  const clubs = await Clubs.find({ approved: true }).select("clubname");
  res.status(200).send({
    status: true,
    data: clubs,
  });
});

// @desc POST register a club
// @route POST /api/v1/auth/registerclub
// @access public
exports.clubRegister = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { clubName, email, password, name } = req.body;

  try {

    const registeredClub = await accountModel.create({
      clubName, email, password, role: "clubadmin", name
    });

    if (registeredClub) {

      res.status(200).send({
        data: registeredClub.getSignedJwtToken(),
        success: true
      });
    }

  } catch (error) {
    next(error);
  }

  // const clubdata=await accountModel.create()

});

exports.registerInd = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {

    const registerAccount = await accountModel.create(req.body);
    res.status(200).json({
      success: true,
      data: registerAccount
    });

  } catch (error) {
    next(error);
  }
});