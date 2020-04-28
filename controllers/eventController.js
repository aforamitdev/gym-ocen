const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Events = require("../models/EventsModel");
exports.createEvent = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const event = await Events.create(req.body);
    return res.json(event);
  } catch (error) {
    console.log(error);
  }
});

exports.getCurrentEvents = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const events = await Events.find({});
    console.log(events);
    return res.json(events);
  } catch (error) {
    console.log(error);
  }
});
