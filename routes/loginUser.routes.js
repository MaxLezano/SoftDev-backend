const { Router } = require("express");
const route = Router();
const { login } = require("../controllers/loginController");
const { body } = require("express-validator");

route.post(
  "/",
  body("email").not().isEmpty().isEmail().withMessage("ingrese un correo válido"),
  body("password").not().isEmpty().withMessage("la contraseña es incorrecta"),
  login
);

module.exports = route;