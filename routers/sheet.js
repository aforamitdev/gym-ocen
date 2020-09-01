const express = require("express");
const {
  createSheet,
  getSheetsByLevel,
} = require("../controllers/sheetControllsers");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.route("/createSheet").post(protect, authroize(["admin"]), createSheet);
router.route("/getsheetsbylevel").get(getSheetsByLevel);
module.exports = router;
