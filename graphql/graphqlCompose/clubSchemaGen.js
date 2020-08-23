const { clubTC } = require("./TypeComposers");

exports.clubQuery = {
  clubById: clubTC.getResolver("findById"),
  //   userByIds: clubGQLGenerator.getResolver("findByIds"),
  //   userOne: clubGQLGenerator.getResolver("findOne"),
  clubMany: clubTC.getResolver("findMany"),
  // players: clubTC.getResolver("getPlayersForClub"),
  //   userCount: clubGQLGenerator.getResolver("count"),
  //   userConnection: clubGQLGenerator.getResolver("connection"),
  //   userPagination: clubGQLGenerator.getResolver("pagination"),
};

exports.clubMutations = {
  clubCreateOne: clubTC.getResolver("createOne"),
  // userCreateMany: clubGQLGenerator.getResolver("createMany"),
  // userUpdateById: clubGQLGenerator.getResolver("updateById"),
  // userUpdateOne: clubGQLGenerator.getResolver("updateOne"),
  // userUpdateMany: clubGQLGenerator.getResolver("updateMany"),
  // userRemoveById: clubGQLGenerator.getResolver("removeById"),
  // userRemoveOne: clubGQLGenerator.getResolver("removeOne"),
  userRemoveMany: clubTC.getResolver("removeMany"),
};
