const express = require("express");
const {
  createEvent,
  getCurrentEvents,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/createevent", createEvent);
router.get("/getcurentevents", getCurrentEvents);
module.exports = router;
