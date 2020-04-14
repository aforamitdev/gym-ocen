const express = require("express");
const { createSheet } = require("../controllers/adminControllers");
const { protect, authroize } = require("../middleware/auth");
const router = express.Router();

router.route("/createSheet").post(protect, authroize(["admin"]), createSheet);

module.exports = router;
