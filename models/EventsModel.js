const Mongoose = require("mongoose");

const EventSchema = new Mongoose.Schema({
  title: String,
  discription: String,
  location: String,
  registartionDue: Date,
  eventDate: Date,
  reportingTime: String,
  level: String,
  levelSheets: [{ type: Mongoose.Schema.Types.ObjectId, ref: "markingSheets" }],
  participant: [{ type: Mongoose.Schema.Types.ObjectId, ref: "User" }],
  clubparticipant: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Clubs" }],
  live: Boolean,
});

module.exports = Mongoose.model("Events", EventSchema);
