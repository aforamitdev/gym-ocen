const express = require("express");
const { register, login, getMe } = require("../controllers/auth");
console.log("Auth test");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
