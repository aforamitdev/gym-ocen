const { userTC } = require("./TypeComposers");
exports.userQuery = {
  userById: userTC.getResolver("findById"),
  userByIds: userTC.getResolver("findByIds"),
  userOne: userTC.getResolver("findOne"),
  userMany: userTC.getResolver("findMany"),
  userCount: userTC.getResolver("count"),
  userConnection: userTC.getResolver("connection"),
  userPagination: userTC.getResolver("pagination"),
};

exports.userMutations = {
  userCreateOne: userTC.getResolver("createOne"),
  userCreateMany: userTC.getResolver("createMany"),
  userUpdateById: userTC.getResolver("updateById"),
  userUpdateOne: userTC.getResolver("updateOne"),
  userUpdateMany: userTC.getResolver("updateMany"),
  userRemoveById: userTC.getResolver("removeById"),
  userRemoveOne: userTC.getResolver("removeOne"),
  userRemoveMany: userTC.getResolver("removeMany"),
};
