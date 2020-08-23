const { composeWithMongoose } = require("graphql-compose-mongoose");
const { SchemaComposer } = require("graphql-compose");
const userModel = require("../../models/UserModel");
const userSchema = new SchemaComposer();
const userGQLGenerator = composeWithMongoose(userModel, {
  schemaComposer: userSchema,
});

exports.userQuery = {
  userById: userGQLGenerator.getResolver("findById"),
  userByIds: userGQLGenerator.getResolver("findByIds"),
  userOne: userGQLGenerator.getResolver("findOne"),
  userMany: userGQLGenerator.getResolver("findMany"),
  userCount: userGQLGenerator.getResolver("count"),
  userConnection: userGQLGenerator.getResolver("connection"),
  userPagination: userGQLGenerator.getResolver("pagination"),
};

exports.userMutations = {
  userCreateOne: userGQLGenerator.getResolver("createOne"),
  userCreateMany: userGQLGenerator.getResolver("createMany"),
  userUpdateById: userGQLGenerator.getResolver("updateById"),
  userUpdateOne: userGQLGenerator.getResolver("updateOne"),
  userUpdateMany: userGQLGenerator.getResolver("updateMany"),
  userRemoveById: userGQLGenerator.getResolver("removeById"),
  userRemoveOne: userGQLGenerator.getResolver("removeOne"),
  userRemoveMany: userGQLGenerator.getResolver("removeMany"),
};
