const mongoose = require("mongoose");

const PlayerModel = new Mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scoreSheets: [{ type: mongoose.Schema.Types.ObjectId, ref: "ScoreSheet" }],
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clubs",
  },
});

module.exports = Mongoose.model("Player", PlayerModel);
