const User = require("../Models/userModel");

async function getUser(req, res) {
    try {
  
        const user = await User.findById(req.params.id);
      
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports = {
    getUser
  };