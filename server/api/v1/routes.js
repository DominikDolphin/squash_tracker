const express = require('express');
const router = express.Router();

const { createMatch, getAllMatches } = require('./controllers/matchController');

// Basic health check. If this route is working, the API is working.
router.get('/', (req, res) => {
    res.json({ apiVersion: "v1", date: new Date()});
});

router.get('/getAllMatches', getAllMatches);

router.post('/createMatch', createMatch);


module.exports = router;