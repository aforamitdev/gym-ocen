const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Clubs = require("../models/ClubsModel");
const User = require("../models/UserModel");
exports.registerClub = asyncHandler(async (req, res, next) => {
  const { clubName, clubAdress, phone, headCoatchName } = req.body;
  console.log(req.body);
  const user = req.user;
  try {
    const Club = await Clubs.create({
      clubname: clubName,
      clubaddress: clubAdress,
      phone: phone,
      admin: user,
    });

    return res.send({
      status: true,
      message: "Sucessfull Register club",
      data: Club,
    });
  } catch (error) {
    console.log("Fail to register club", error.message);
    return next(new ErrorResponse("Fail to Register Club ", 400));
  }
});

// upda
exports.updateClub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { phone, telePhone } = req.body;
  let address = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pin: req.body.pin,
    country: req.body.country,
  };

  try {

    const updatedClub = await Clubs.findByIdAndUpdate(id, { address: address, phone: phone, telePhone: telePhone }, { new: true });
    console.log(updatedClub, "club Updated");
    return res.status(200).json({
      success: true,
      data: updatedClub,
      message: ""
    });

  } catch (error) {
    next(error);
  }
});

exports.getMyClub = asyncHandler(async (req, res, next) => {
  // console.log("getMyClub executed");
  const myClub = await Clubs.findOne({ admin: req.user._id }).populate("admin");

  res.send({ success: true, data: myClub });
});



exports.getAllClubs = asyncHandler(async (req, res, next) => {
  const allClub = await Clubs.find();
  res.send({ success: true, data: allClub });
});

exports.getClubById = asyncHandler(async (req, res, next) => {
  console.log(req.query.id);
  console.log(req.params.id, "idididi");
  const club = await await Clubs.findById(req.params.id).populate("admin");
  console.log(club);
  res.send({ success: true, data: club });
});

exports.changeClubStatus = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.params);
  console.log(req.query);
  const club = await Clubs.findById(req.params.id);

  if (club.approved) {
    club.approved = "false";
  } else {
    club.approved = "true";
  }
  await club.save();

  console.log(club);
  // const club = await Clubs.findById(req.params.id);
  // await club.ChangeStatus();

  res.send({ status: true, data: club });
});

exports.getAllStudents = asyncHandler(async (req, res, next) => {
  const { clubId } = req.query;
  console.log(req.query, "query");
  try {
    const students = await User.find({ clubID: clubId, role: "player" });
    res.json({ success: true, data: students });
  } catch (error) {
    return next(new ErrorResponse("Fail to get students for this club", 500));
  }
});


exports.allClub = asyncHandler(async (req, res, next) => {
  console.log(req.params, "params");
  try {
    if (req.query.onlyMeta) {
      const clubForRegistration = await Clubs.find({ approved: true });
      return res.json({ success: true, data: clubForRegistration, message: "" });
    }
  } catch (error) {
    next(error);
  }

});

exports.getAllPlayers = asyncHandler(async (req, res, next) => {
  const { eventId } = req.query;
  const { clubId } = req.user;
  try {
    const clubPlayers = await Clubs.findById({ _id: clubId }).populate("clubPlayers");

    return res.status(200).json({ success: true, result: clubPlayers });
  } catch (error) {
    next(error);
  }
});