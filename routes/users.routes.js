const { Router } = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  getById,
  updateUser,
} = require("../controllers/userControllers");
const { body } = require("express-validator");
const { emailUnique } = require("../helpers/validation");
const route = Router();
const { jwtValidator } = require("../middlewares/jwtValidation");

route.get("/", jwtValidator ,getUsers);
route.get("/:id", getById);

route.post(
  "/",
  body("email")
    .not()
    .isEmpty()
    .withMessage("el campo mail es requerido")
    .isEmail()
    .withMessage("ingrese un mail Valido")
    .custom(emailUnique),
  body("password")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      "minimo 8 caracteres, una letra mayuscula, un signo especial y minimo un digito"
    ),
  body("nameCompleted").isLength(5).withMessage("minimo 5 caracteres"),
  body("numberContact")
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .withMessage("ingrese un numero de telefono valido"),
  body("codigoPostal")
    .matches(/^[0-9]{4}(?:-[0-9]{4})?$/)
    .withMessage("ingrese un codigo postal"),
  createUser
);

route.delete("/:id", deleteUser);


route.patch('/:id',
body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
.withMessage("minimo 8 caracteres, una letra mayuscula, un signo especial y minimo un digito"),
body("nameCompleted").isLength(5).withMessage("minimo 5 caracteres"),
body("numberContact").matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
.withMessage("ingrese un numero de telefono valido"),
body("codigoPostal").matches(/^[0-9]{4}(?:-[0-9]{4})?$/).withMessage("ingrese un codigo postal"), 
updateUser)




module.exports = route;
