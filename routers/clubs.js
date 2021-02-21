const express = require("express");
const { protect, authroize } = require("../middleware/auth");
const {
  getMyClub,
  registerClub,
  getAllClubs,
  getClubById,
  changeClubStatus,
  getAllStudents,
  updateClub,
  allClub, getAllPlayers

} = require("../controllers/clubControllers");
const eventsRouter = require("./event");
const router = express.Router();

router.get("/allclub", allClub);
router.get("/players", getAllPlayers);
router.get("/students", getAllStudents);
router.get("/me", protect, getMyClub);
router.post("/registerclub", protect, registerClub);
// router.post("/update")
router.route("/:id").get(getClubById).patch(changeClubStatus).put(updateClub);
// router.get("/", protect, getAllClubs);
router.use("/events", eventsRouter);
module.exports = router;
