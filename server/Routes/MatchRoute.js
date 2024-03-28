const { createMatch, getAllMatches } = require("../Controllers/MatchController");
const {AuthMiddleware} = require('../Middlewares/AuthMiddleware')
const router = require("express").Router();

router.post("/",AuthMiddleware, createMatch);
router.get("/",AuthMiddleware, getAllMatches);
// router.post('/login', Login)
// router.post('/',userVerification)

module.exports = router;