const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema({
  clubName: {
    type: String,
    required: [true, "Please add a name"],
  },
  Address: {
    // street: {
    //   type: String,
    //   require: [true, "Street is required"]
    // },

    // city: {
    //   type: String,
    //   require: [true, "City is required"]
    // },
    // state: {
    //   type: String,
    //   require: [true, "State is required"]
    // },
    // pin: {
    //   type: Number,
    //   require: [true, "Street is required"]
    // },
    // country: {
    //   type: String,
    //   require: [true, "Country is required"]
    // },
    // phone: {
    //   type: String,
    //   require: [true, "Phone is required"]
    // },
    // telePhone: {
    //   type: String,
    //   require: [true, "Telephone is required"]
    // },
    type: Object,
    require: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
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
      ref: "player",
    },
  ],
});

module.exports = mongoose.model("Clubs", ClubSchema);
