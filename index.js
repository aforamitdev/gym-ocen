const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorHandlers = require("./middleware/errorHandler");
const authRoutes = require("./routers/auth");
const adminRoutes = require("./routers/admin");
const sheetRoutes = require("./routers/sheet");
const eventRoutes = require("./routers/event");
const clubsRoutes = require("./routers/clubs");
dotenv.config({ path: "./config/config.env" });

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// express
// routers
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/sheet", sheetRoutes);
app.use("/api/v2/admin", adminRoutes);

// resources

app.use("/api/v2/event", eventRoutes);
app.use("/api/v2/club", clubsRoutes);
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
