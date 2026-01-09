const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { registerUser, login, currentUser } = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", login);

router.get("/currentUser", validateToken, currentUser);
//http://localhost:5001/api/users

module.exports = router;