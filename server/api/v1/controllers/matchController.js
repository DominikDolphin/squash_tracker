const { Match } = require("../../../models/matchModel");

async function getAllMatches(req, res) {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function createMatch(req, res) {
  try {
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
