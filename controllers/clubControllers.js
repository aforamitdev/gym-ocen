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

exports.getMyClub = asyncHandler(async (req, res, next) => {
  // console.log("getMyClub executed");
  console.log(req.user._id, "LOGEDDDDDDD");
  const myClub = await Clubs.findOne({ admin: req.user._id });
  console.log(myClub);

  res.send({ sucess: true, data: myClub });
});

exports.getAllClubs = asyncHandler(async (req, res, next) => {
  const allClub = await Clubs.find();
  res.send({ sucess: true, data: allClub });
});

exports.getClubById = asyncHandler(async (req, res, next) => {
  console.log(req.query.id);
  console.log(req.params.id, "idididi");
  const club = await await Clubs.findById(req.params.id).populate("admin");
  console.log(club);
  res.send({ status: true, data: club });
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
    res.json({ sucess: true, data: students });
  } catch (error) {
    return next(new ErrorResponse("Fail to get students for this club", 500));
  }
});
