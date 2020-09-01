const { playerTC } = require("./TypeComposers");

exports.playerQuery = {
  playerById: playerTC.getResolver("findById"),
  //   userByIds: playerGQLGenerator.getResolver("findByIds"),
  //   userOne: playerGQLGenerator.getResolver("findOne"),
  //   userMany: playerGQLGenerator.getResolver("findMany"),
  //   userCount: playerGQLGenerator.getResolver("count"),
  //   userConnection: playerGQLGenerator.getResolver("connection"),
  //   userPagination: playerGQLGenerator.getResolver("pagination"),
};

exports.playerMutations = {
  playerCreateOne: playerTC.getResolver("createOne"),
  // userCreateMany: playerGQLGenerator.getResolver("createMany"),
  // userUpdateById: playerGQLGenerator.getResolver("updateById"),
  // userUpdateOne: playerGQLGenerator.getResolver("updateOne"),
  // userUpdateMany: playerGQLGenerator.getResolver("updateMany"),
  // userRemoveById: playerGQLGenerator.getResolver("removeById"),
  // userRemoveOne: playerGQLGenerator.getResolver("removeOne"),
  // userRemoveMany: playerGQLGenerator.getResolver("removeMany"),
};
