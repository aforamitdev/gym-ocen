const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const ClubsModel = require("../models/ClubsModel");
const EventsModel = require("../models/EventsModel");

exports.createSheet = asyncHandler(async (req, res, next) => {
  res.send({ message: "creatingSheet Sheet" });
});

exports.getClubs = asyncHandler(async (req, res, next) => {

  try {
    const clubs = await ClubsModel.find();
    return res.status(200).json({ success: true, result: clubs });

  } catch (error) {
    throw new Error(error);
  }
});

exports.getClubByIdAdmin = asyncHandler(async (req, res, next) => {
  const { clubId } = req.query;
  console.log(req.query);
  try {
    const clubDetail = await ClubsModel.findById(clubId).populate("clubPlayers");
    console.log(clubDetail);
    return res.status(200).json({ success: true, result: clubDetail });
  } catch (error) {
    next(error);
  }
});

exports.activateClub = asyncHandler(async (req, res, next) => {

  const { clubId } = req.query;
  console.log(clubId, "from activate club");
  try {
    const activateClub = await ClubsModel.findByIdAndUpdate(clubId, { approved: true }, { new: true });
    return res.status(200).json({ success: true, result: activateClub });
  } catch (error) {
    next(error);
  }
});

exports.allEvents = asyncHandler(async (req, res, next) => {
  try {
    const allEvent = await EventsModel.find({});
    return res.status(200).json({ success: true, result: allEvent });
  } catch (error) {

  }
});

exports.eventDetailsAdmin = asyncHandler(async (req, res, next) => {
  const { eventId } = req.query;
  console.log(JSON.parse(eventId));
  try {
    const eventDetals = await EventsModel.find({ _id: JSON.parse(eventId).id }).populate("eventSheets").populate("eventStudent.players").exec();
    console.log(eventDetals);
    return res.status(200).json({ success: true, result: eventDetals });
  } catch (error) {
    next(error);
  }
});