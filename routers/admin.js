const express = require("express");
const { createSheet, getClubs, getClubByIdAdmin, activateClub, eventDetailsAdmin, allEvents } = require("../controllers/adminControllers");
const { getClubById } = require("../controllers/clubControllers");

const { protect, authroize } = require("../middleware/auth");
const clubRouter = require("./clubs");
const router = require("./event");
const eventRouter = require("./event");

router.get("/clubs", getClubs);

router.get("/club", getClubByIdAdmin);
router.route("/createSheet").post(protect, authroize(["admin"]), createSheet);
router.get("/activateclub", activateClub);
router.get("/all-event", allEvents);
router.get("/event-details", eventDetailsAdmin);
module.exports = router;
