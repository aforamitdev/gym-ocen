const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Sheets = require("../models/SheetsModel");
exports.createSheet = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const sheet = await Sheets.create(req.body);
    return res.json(sheet);
  } catch (error) {
    throw new Error(error);
  }

});

exports.getSheetsByLevel = async (req, res) => {
  const { level } = req.query;
  console.log(level);
  try {
    const sheetsByLevel = await Sheets.find().where({ sheetLevel: level });

    console.log(sheetsByLevel);
    return res.status(200).json({ status: "success", result: sheetsByLevel });
  } catch (error) {
    throw new Error(error);
  }
};
