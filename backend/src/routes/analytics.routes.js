const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, analyticsController.getAnalytics);

module.exports = router;
