const express = require("express");
const { protect, authroize } = require("../middleware/auth");
const {
  getMyClub,
  registerClub,
  getAllClubs,
  getClubById,
  changeClubStatus,
  getAllStudents,
} = require("../controllers/clubControllers");
const eventsRouter = require("./event");
const router = express.Router({ mergeParams: true });

router.get("/students", getAllStudents);
router.get("/getmyclub", protect, getMyClub);
router.post("/registerclub", protect, registerClub);
router.route("/:id").get(getClubById).patch(changeClubStatus);
router.get("/", protect, getAllClubs);
router.use("/events", eventsRouter);
module.exports = router;
