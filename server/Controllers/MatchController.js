const { Match, Game } = require("../Models/MatchModel");

async function getAllMatches(req, res) {
  try {

    
    if (req.query.userid) {
      console.log(req.query.userid)
      const matches = await Match.find({ createdBy: req.query.userid });
      return res.status(200).json(matches);
    }

    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllMatchesCreatedByUserId(req, res) {
  try {
    const matches = await Match.find({ _id: req.user._id });
    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function createMatch(req, res) {
  try {
    
    // If the request body does not contain a createdBy, set it to the user's id that made the request
    if (!req.body.createdBy) {
      req.body.createdBy = req.user.id;
    }

    const match = new Match(req.body);
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
  }
}

async function addGameToMatch(req, res) {
  try {
    const match = await Match.findById(req.params.id);
    const game = new Game(req.body);
    match.games.push(game);
    const saved = await match.save();
    if (saved) {
      return res.status(201).json(game);
    }
    // res.status(201).json(await match.save());
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteGameFromMatch(req, res) {
  try {
    const match = await Match.findById(req.params.matchid);
    // const game = new Game(req.params.gameid);
    // match.games.push(game);
    match.games.pull(req.params.gameid);
    const saved = await match.save();
    if (saved) {
      return res.status(201).json(`Game with id ${req.params.gameid} has been deleted`);
    }
    // res.status(201).json(await match.save());
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function updateMatchPlayers(req, res) {
  try {
    const match = await Match.findById(req.params.id);
    match.players = req.body.players;
    const saved = await match.save();
    if (saved) {
      return res.status(201).json(`Players have been updated`);
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllMatches,
  createMatch,
  addGameToMatch,
  deleteGameFromMatch,
  updateMatchPlayers
};
