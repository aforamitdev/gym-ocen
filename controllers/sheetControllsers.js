const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Sheets = require("../models/SheetsModel");
exports.createSheet = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { SheetName, sheetLevel, createSheet } = req.body;
  try {
    const sheet = await Sheets.create({
      SheetName: SheetName,
      sheetLevel: sheetLevel,
      sheet: createSheet,
    });
    console.log(sheet);
    return res.json(sheet);
  } catch (error) {
    console.log(error);
  }
});

exports.getSheetsByLevel = async (req, res) => {
  const { level } = req.query;
  try {
    const sheetsByLevel = await Sheets.find({ sheetLevel: level }).select(
      "SheetName sheetLevel"
    );
    console.log(sheetsByLevel);
    return res.status(200).json({ status: "success", result: sheetsByLevel });
  } catch (error) {
    console.log(error);
  }
};
