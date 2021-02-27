const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Events = require("../models/EventsModel");

exports.createEvent = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const event = await Events.create(req.body);
    console.log(event, "event");
    return res.status(200).json(event);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getCurrentEvents = asyncHandler(async (req, res, next) => {
  try {
    const events = await Events.find({});
    return res.status(200).json({ result: true, message: "", result: events });
  } catch (error) {
    console.log(error);
  }
});

// exports.getEventById = asyncHandler(async (req, res, next) => {
//   console.log(req.query);
//   console.log(req.params.id);
//   // console.log(`${req.query.options[0]} ${req.query.options[1]}`);
//   try {
//     if (!req.query.options) {
//       console.log("here");
//       const data = await Events.findById(req.params.id);
//       return res.status(200).json({ status: true, data: data });
//     }
//     if (req.query.options.includes("participant")) {
//       console.log("her 2");
//       const data = await await Events.findById(req.params.id)
//         .populate({
//           path: "participant",
//           select: "name email clubID",
//         })
//         .populate({ path: "clubparticipant", select: "_id clubname" });
//       return res.status(200).json({ status: true, data: data });
//     }
//     if (req.query.options.includes("levelSheet")) {
//       const data = await Events.findById(req.params.id).populate("levelSheet");

//       return res.status(200).json({ status: true, data: data });
//     }

//     // const event = await queryStr;
//   } catch (error) {
//     console.log(error);
//   }
// });

exports.addParticepents = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const result = await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { participant: req.body.particepents, clubparticipant: req.body.clubId }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});


exports.registerClubPlayers = asyncHandler(async (req, res, next) => {
  const { eventId, players } = req.body;
  const { clubId } = req.user;
  console.log(req.user);
  console.log(req.body);
  try {
    const result = await Events.findByIdAndUpdate(eventId.id, { eventStudent: { clubId: clubId, players: players } });
    console.log(result);
    return res.status(200).json({ success: true, result: result, message: "" });
  } catch (error) {
    next(error);
  }
});