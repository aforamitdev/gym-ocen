const Mongoose = require("mongoose");

const ScoreSheet = new Mongoose.Schema({
  player: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  score: {
    type: Array,
    data: [],
  },
});

module.exports = Mongoose.model("Events", EventSchema);
