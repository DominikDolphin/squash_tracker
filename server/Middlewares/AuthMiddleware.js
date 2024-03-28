const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).send("Token not found");

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = user;
    next();
  });
}

module.exports = { AuthMiddleware };
