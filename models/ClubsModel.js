const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema({
  clubName: {
    type: String,
    required: [true, "Please add a name"],
  },
  address: {
    type: Object,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accounts",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
  },
  telePhone: {
    type: String
  },
  clubPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "players",
    },
  ],
});

module.exports = mongoose.model("clubs", ClubSchema);
