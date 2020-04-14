const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resourse  not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (error.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  console.error(error);
  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
