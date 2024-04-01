const { createMatch, getAllMatches, addGameToMatch, deleteGameFromMatch, updateMatchPlayers, updateMatchBestOf, setMatchSettings } = require("../Controllers/MatchController");
const {AuthMiddleware} = require('../Middlewares/AuthMiddleware')
const router = require("express").Router();

// router.post("/",AuthMiddleware, createMatch);
// router.get("/",AuthMiddleware, getAllMatches);

router.post("/", createMatch);
router.get("/", getAllMatches);
router.post("/:id/addGame", addGameToMatch)
router.delete("/:matchid/:gameid", deleteGameFromMatch)
router.put("/:id/updatePlayers", updateMatchPlayers)
router.put("/:id/updateBestOf", updateMatchBestOf)
router.put("/:id/setMatchSettings", setMatchSettings)
// router.post('/login', Login)
// router.post('/',userVerification)

module.exports = router;