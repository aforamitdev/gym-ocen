const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.createSheet = asyncHandler(async (req, res, next) => {
  res.send({ message: "creatingSheet Sheet" });
});
