const Mongoose = require("mongoose");
const sheetModel = new Mongoose.Schema({
  sheetName: {
    type: String,
    require: true
  },
  sheetLevel: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    default: 10
  },
  ageLimit: {
    type: Number
  },
  apparatusType: {
    type: String
  },
  apparatus: {
    type: Object,
    require: true
  },
  fails: [
    {
      type: Object,
      require: true
    }
  ]
});


module.exports = Mongoose.model("sheets", sheetModel);
