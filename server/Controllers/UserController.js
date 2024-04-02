const User = require("../Models/userModel");

async function getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);

      // if query paramets are present, only show the fields requested
      if (req.query.fields) {
        const fields = req.query.fields.split(",");
        const newUser = {};
        fields.forEach((field) => {
          newUser[field] = user[field];
        });
        return res.status(200).json(newUser);
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  
  async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        // if query paramets are present, only show the fields requested
        if (req.query.fields) {
          const fields = req.query.fields.split(",");
          const filteredUsers = users.map((user) => {
            const newUser = {};
            fields.forEach((field) => {
              newUser[field] = user[field];
            });
            return newUser;
          });
          return res.status(200).json(filteredUsers);
        }
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports = {
    getUser,
    getAllUsers
  };