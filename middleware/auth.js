// @ts-nocheck
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/UserModel");
console.log("exexutes");
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization, 'token ');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if(req.cookies.token){
  //   token=req.cookies.token
  // }
  // make sure token is send
  if (!token) {
    return next(
      new ErrorResponse("Not Authroize to access this route as no token", 401)
    );
  }
  try {
    // console.log(process.env.JWT_SECRATE);
    // console.log(token, 'token logi');
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(
    //   decode,
    //   "-----------------------------decode----------------------------------------"
    // );
    req.user = await User.findById(decode.id);
    // console.log('user data added to the requset bar');
    next();
  } catch (err) {
    // console.log(err.message);
    return next(
      new ErrorResponse("Not Authroize to access this route --", 401)
    );
  }
});

exports.authroize = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user.role, 'user role  in req ');
    console.log(roles[0], "check");
    console.log(roles[0].includes(req.user.role));
    if (!roles[0].includes(req.user.role)) {
      console.log("role ");
      new next(
        new ErrorResponse(
          `User role ${req.user.role} is not authroize to access this route`,
          401
        )
      );
    }
    next();
  };
};
