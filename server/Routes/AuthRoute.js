const { Signup, Login } = require("../Controllers/AuthController");
// const {userVerification} = require('../Middlewares/AuthMiddleware')
const router = require("express").Router();

const { AuthMiddleware } = require('../Middlewares/AuthMiddleware')
router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', AuthMiddleware)

module.exports = router;