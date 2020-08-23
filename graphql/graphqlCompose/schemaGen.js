const { schemaComposer } = require("graphql-compose");

const { userMutations, userQuery } = require("./userSchemaGen");
const { playerMutations, playerQuery } = require("./playerSchemaGen");
schemaComposer.Query.addFields({
  ...userQuery,
  ...playerQuery,
  name: "String",
});

schemaComposer.Mutation.addFields({
  ...userMutations,
  ...playerMutations,
  name: "String",
});

exports.graphqlSchema = schemaComposer.buildSchema();
