const express = require("express");
const {
  createSheet,
  getSheetsByLevel,
} = require("../controllers/sheetControllsers");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.route("/createSheet").post(createSheet);
router.route("/sheet-by-level").get(getSheetsByLevel);
module.exports = router;
