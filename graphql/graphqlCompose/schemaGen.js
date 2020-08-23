const { schemaComposer } = require("graphql-compose");

const { userMutations, userQuery } = require("./userSchemaGen");

schemaComposer.Query.addFields({
  ...userQuery,
  name: "String",
});

schemaComposer.Mutation.addFields({
  ...userMutations,
  name: "String",
});

exports.graphqlSchema = schemaComposer.buildSchema();
