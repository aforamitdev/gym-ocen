const express = require("express");
const { register, login, getMe, getClubsName, clubRegister, registerInd, adminRegister } = require("../controllers/auth");
console.log("Auth test");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/registerclub", clubRegister);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/clubsname", getClubsName);
router.post("/registerind", registerInd);
router.post("/register-admin", adminRegister);
module.exports = router;
