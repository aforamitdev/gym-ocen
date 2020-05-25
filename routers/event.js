const express = require("express");
const {
  createEvent,
  getCurrentEvents,
  getEventById,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/createevent", createEvent);
router.get("/getcurentevents", getCurrentEvents);
router.get("/:id", getEventById);
module.exports = router;
