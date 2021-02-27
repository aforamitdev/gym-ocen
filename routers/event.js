const express = require("express");
const {
  createEvent,
  getCurrentEvents,
  getEventById,
  addParticepents,
  registerClubPlayers
} = require("../controllers/eventController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/register-club-players", protect, registerClubPlayers);
router.post("/create-event", createEvent);
router.get("/current-events", getCurrentEvents);
// router.get("/:id", getEventById);
// router.post("/:id", addParticepents);
router.get("/event/:id", () => {
  // admin/event/:id
  console.log("ececuted");
});
module.exports = router;
