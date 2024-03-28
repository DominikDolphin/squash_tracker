const { Match } = require("../Models/MatchModel");

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

module.exports = {
  getAllMatches,
  createMatch,
};
