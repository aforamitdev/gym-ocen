const express = require('express');
const { createSheet } = require('../controllers/adminControllers');
const { getClubById } = require('../controllers/clubControllers');
const clubRouter = require('./clubs');
const { protect, authroize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

router.route('/createSheet').post(protect, authroize(['admin']), createSheet);

router.use('/club/', clubRouter);
module.exports = router;
