const express = require("express");
const authController = require("../controllers/auth");
const AuthValidation = require("../middlewares/validations/authValidation");

const router = express.Router();

router.post("/register",AuthValidation.register, authController.register);

router.post("/login",AuthValidation.login, authController.login);

module.exports = router;
