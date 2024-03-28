const router = require("express").Router();
const authRoutes = require("./AuthRoute");
const matchRoutes = require("./MatchRoute");

router.use("/auth", authRoutes);
router.use("/match", matchRoutes);

module.exports = router;