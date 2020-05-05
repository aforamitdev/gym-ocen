const express = require("express");
const { register, login, getMe, getClubsName } = require("../controllers/auth");
console.log("Auth test");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/clubsname", getClubsName);
module.exports = router;
