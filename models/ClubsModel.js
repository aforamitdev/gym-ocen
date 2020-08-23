const mongoose = require("mongoose");
const userSchema = require("./UserModel");
const ClubSchema = new mongoose.Schema({
  clubname: {
    type: String,
    required: [true, "Please add a name"],
  },
  clubaddress: {
    type: String,
    require: [true, "Please add a address"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    require: [true, "Please add Phone NO"],
  },

  clubPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

module.exports = userSchema.discriminator("Clubs", ClubSchema);
