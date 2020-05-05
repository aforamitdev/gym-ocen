const express = require("express");
const { protect, authroize } = require("../middleware/auth");
const {
  getMyClub,
  registerClub,
  getAllClubs,
} = require("../controllers/clubControllers");
const router = express.Router();

router.get("/getmyclub", protect, getMyClub);
router.post("/registerclub", protect, registerClub);
router.get("/", protect, getAllClubs);

module.exports = router;
