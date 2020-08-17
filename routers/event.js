const express = require("express");
const {
  createEvent,
  getCurrentEvents,
  getEventById,
  addParticepents,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/createevent", createEvent);
router.get("/getcurrentevents", getCurrentEvents);
router.get("/:id", getEventById);
router.post("/:id", addParticepents);
router.get("/event/:id", () => {
  // admin/event/:id
  console.log("ececuted");
});
module.exports = router;
