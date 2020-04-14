const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.registerClub = asyncHandler(async (req, res, next) => {
  res.send({ message: "Club Registration" });
});
