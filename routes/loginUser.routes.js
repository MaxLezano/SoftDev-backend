const { Router } = require("express");
const route = Router();
const { login } = require("../controllers/loginController");
const { body } = require("express-validator");

route.post(
  "/",
  body("email")
    .not()
    .isEmpty()
    .withMessage("el campo mail es requerido")
    .isEmail()
    .withMessage("ingrese un mail Valido"),
  body("password").matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/
  ).withMessage("password incorrecto"),
  login
);

module.exports = route;
