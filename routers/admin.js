const express = require("express");
const { createSheet } = require("../controllers/adminControllers");
const { getClubById } = require("../controllers/clubControllers");

const { protect, authroize } = require("../middleware/auth");
const clubRouter = require("./clubs");
const eventRouter = require("./event");
const router = express.Router({ mergeParams: true });

router.route("/createSheet").post(protect, authroize(["admin"]), createSheet);

router.use("/club/", clubRouter);
router.use("/event/", eventRouter);
module.exports = router;
