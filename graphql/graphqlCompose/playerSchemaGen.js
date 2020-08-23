const { composeWithMongoose } = require("graphql-compose-mongoose");
const { SchemaComposer } = require("graphql-compose");
const playerModel = require("../../models/playerModel");
const playerSchema = new SchemaComposer();
const playerGQLGenerator = composeWithMongoose(playerModel, {
  schemaComposer: playerSchema,
});

exports.playerQuery = {
  playerById: playerGQLGenerator.getResolver("findById"),
  //   userByIds: playerGQLGenerator.getResolver("findByIds"),
  //   userOne: playerGQLGenerator.getResolver("findOne"),
  //   userMany: playerGQLGenerator.getResolver("findMany"),
  //   userCount: playerGQLGenerator.getResolver("count"),
  //   userConnection: playerGQLGenerator.getResolver("connection"),
  //   userPagination: playerGQLGenerator.getResolver("pagination"),
};

exports.playerMutations = {
  playerCreateOne: playerGQLGenerator.getResolver("createOne"),
  // userCreateMany: playerGQLGenerator.getResolver("createMany"),
  // userUpdateById: playerGQLGenerator.getResolver("updateById"),
  // userUpdateOne: playerGQLGenerator.getResolver("updateOne"),
  // userUpdateMany: playerGQLGenerator.getResolver("updateMany"),
  // userRemoveById: playerGQLGenerator.getResolver("removeById"),
  // userRemoveOne: playerGQLGenerator.getResolver("removeOne"),
  // userRemoveMany: playerGQLGenerator.getResolver("removeMany"),
};
