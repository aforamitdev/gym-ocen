const { schemaComposer } = require("graphql-compose");

const { userMutations, userQuery } = require("./userSchemaGen");
const { playerMutations, playerQuery } = require("./playerSchemaGen");
const { clubMutations, clubQuery } = require("./clubSchemaGen");

// userQuery.add

schemaComposer.Query.addFields({
  ...userQuery,
  ...playerQuery,
  ...clubQuery,
  // name: "String",
});

schemaComposer.Mutation.addFields({
  ...userMutations,
  ...playerMutations,
  ...clubMutations,
  // name: "String",
});

exports.graphqlSchema = schemaComposer.buildSchema();
