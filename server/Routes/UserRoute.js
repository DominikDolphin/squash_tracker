const { getUser, getAllUsers } = require("../Controllers/UserController");
const {AuthMiddleware} = require('../Middlewares/AuthMiddleware')
const router = require("express").Router();

// router.post("/",AuthMiddleware, createMatch);
// router.get("/",AuthMiddleware, getAllMatches);

router.get("/:id", getUser);
router.get("/", getAllUsers);
// router.get("/", getAllMatches);
// router.post('/login', Login)
// router.post('/',userVerification)

module.exports = router;