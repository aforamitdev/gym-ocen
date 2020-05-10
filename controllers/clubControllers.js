const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Clubs = require('../models/ClubsModel');
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
      message: 'Sucessfull Register club',
      data: Club,
    });
  } catch (error) {
    console.log('Fail to register club', error.message);
    return next(new ErrorResponse('Fail to Register Club ', 400));
  }
});

exports.getMyClub = asyncHandler(async (req, res, next) => {
  // console.log("getMyClub executed");
  // console.log(req.user._id);
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
  console.log(req.params.id);
  const club = await Clubs.findById(req.query.id).populate('name');
  res.send({ status: true, data: club });
});

exports.changeClubStatus = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const club = await Clubs.findByIdAndUpdate(
    { _id: req.params.id },
    { approved: !this.approved }
  );
  res.send({ id: req.params.id });
});
