const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandlers = require("./middleware/errorHandler");
const authRoutes = require("./routers/auth");
const adminRoutes = require("./routers/admin");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}

// express
app.use(express.static("./dist"));
// routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

// erroe middle ware

app.use(errorHandlers);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  // @ts-ignore
  console.log(`SERVER RUNNING in ${process.env.NODE_ENV} made in ${PORT}`)
);

// handle unhandle prommis rejection
process.on("unhandledRejection", (err, prommis) => {
  console.log(`ERROR: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
