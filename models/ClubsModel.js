const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema({
  clubname: {
    type: String,
    required: [true, "Please add a name"],
  },
  clubaddress: {
    type: String,
    require: [true, "Please add a address"],
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  approved: false,
  clubplayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

module.exports = mongoose.model("Clubs", ClubSchema);
