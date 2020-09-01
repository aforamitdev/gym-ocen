const mongoose = require("mongoose");
const userSchema = require("./UserModel");

const PlayerModel = new mongoose.Schema({
  scoreSheets: [{ type: mongoose.Schema.Types.ObjectId, ref: "ScoreSheet" }],
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clubs",
  },
});

module.exports = userSchema.discriminator("Player", PlayerModel);
