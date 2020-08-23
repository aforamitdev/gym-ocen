const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const errorHandlers = require("./middleware/errorHandler");
const { graphqlSchema } = require("./graphql/graphqlCompose/schemaGen");
dotenv.config({ path: "./config/config.env" });

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// erroe middle ware

app.use(errorHandlers);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "producation") {
  console.log("running production build");
  app.use(express.static("./dist"));
  //
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

const server = new ApolloServer({
  schema: graphqlSchema,
});

server.applyMiddleware({ app, cors: true });

app.listen(5000, () => {
  console.log("ont http://localhost:5000/graphql");
});

// const PORT = process.env.PORT || 5000;
// const server = app.listen(
//   PORT,
//   // @ts-ignore
//   console.log(`SERVER RUNNING in ${process.env.NODE_ENV} made in ${PORT}`)
// );

// handle unhandle prommis rejection
process.on("unhandledRejection", (err, prommis) => {
  console.log(`ERROR: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
