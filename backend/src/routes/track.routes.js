const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, trackController.track);

module.exports = router;
