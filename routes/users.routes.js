const { Router } = require("express");
const { getUsers, createUser, deleteUser, getById, updateUser,
addFavorite, addCart } = require("../controllers/userControllers");
const { body } = require("express-validator");

const { emailUnique } = require("../helpers/validation");
const route = Router();
const { jwtValidator } = require("../middlewares/jwtValidation");
const { validateMongoId } = require('../middlewares/validateMongoId')

route.get("/",jwtValidator,getUsers);
route.get("/:id",[validateMongoId], getById);

route.post("/",
  body("name").not().isEmpty(),
  body("email").not().isEmpty().isEmail()
  .withMessage("ingrese un correo válido").custom(emailUnique),
  
  body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/)
  .withMessage("mínimo 8 caracteres, una letra mayúscula, un signo especial y un dígito"),
  createUser
);

route.delete("/:id",[validateMongoId], deleteUser);
route.patch('/favorites/:id', [ validateMongoId ], addFavorite);
route.patch('/carts/:id', [ validateMongoId ], addCart);

route.patch('/:id', [validateMongoId], updateUser);

module.exports = route;