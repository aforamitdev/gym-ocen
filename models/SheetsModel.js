const Mongoose = require("mongoose");
const markingSheets = new Mongoose.Schema({
  SheetName: {
    type: String,
    required: true,
  },
  sheetLevel: {
    type: String,
    required: true,
  },
  sheet: {
    type: Array,
    required: true,
  },
});

module.exports = Mongoose.model("markingSheets", markingSheets);
