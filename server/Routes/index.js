const router = require("express").Router();
const authRoutes = require("./AuthRoute");
const matchRoutes = require("./MatchRoute");
const userRoutes = require("./UserRoute");

router.use("/auth", authRoutes);
router.use("/match", matchRoutes);
router.use("/user", userRoutes);

module.exports = router;