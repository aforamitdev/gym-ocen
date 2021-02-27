const Mongoose = require("mongoose");

const EventSchema = new Mongoose.Schema({
  title: { type: String },
  eventLevel: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    default: 10
  },
  eventSheets: [{ type: Mongoose.Schema.Types.ObjectId, ref: "sheets" }],

  eventStudent: [{
    clubId: { type: Mongoose.Schema.Types.ObjectId, ref: "clubs" },
    players: [{ type: Mongoose.Schema.Types.ObjectId, ref: "players" }]
  }]

});

module.exports = Mongoose.model("events", EventSchema);
