const { composeWithMongoose } = require("graphql-compose-mongoose");
const userModel = require("../../models/UserModel");
const eventModel = require("../../models/EventsModel");
const scoreModel = require("../../models/ScoreSheet");
const sheetModel = require("../../models/SheetsModel");
const playerModel = require("../../models/playerModel");
const clubModel = require("../../models/ClubsModel");

const userTC = composeWithMongoose(userModel);
const eventTC = composeWithMongoose(eventModel);
const scoreTC = composeWithMongoose(scoreModel);
const sheetTC = composeWithMongoose(sheetModel);
const playerTC = composeWithMongoose(playerModel);
const clubTC = composeWithMongoose(clubModel);
// ! costume fields
// ? for club Type composer

// clubTC.addResolver({
//   name: "getPlayersForClub",
//   type: clubTC,
//   args: { clubID: "MongoID!" },
//   resolve: async ({ source, args, context, info }) => {
//     const players = await userModel.find({ clubID: args.clubID });
//     if (!players) return null;
//     return players;
//   },
// });

// clubTC.addRelation("players", {
//   resolver: (parent, args, ctx, info) => {
//     console.log(args);
//     return userTC.getResolver("findByIds");
//   },
//   prepareArgs: {
//     _ids: (source) => source.clubID,
//   },
// });

clubTC.addFields({
  players: {
    type: [playerTC],

    resolve: async (parent, args, context, info) => {
      return await userModel.find({ clubID: parent._id });
    },
  },
});

module.exports = {
  userTC,
  eventTC,
  scoreTC,
  sheetTC,
  playerTC,
  clubTC,
};
