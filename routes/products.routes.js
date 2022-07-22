const { Router } = require("express");
const route = Router();
const {
  getAllProducts,
  createProduct,
} = require("../controllers/productsController");
const { body } = require("express-validator");

route.get("/", getAllProducts);
route.post(
  "/",
  body("name").not().isEmpty().withMessage("El campo nombre es requerido"),
  body("price")
    .not()
    .isEmpty()
    .withMessage("El campo precio es requerido")
    .isLength({ min: 1, max: 1000000 })
    .withMessage("Numeros incorrectos para el precio")
    .isNumeric(),
  body("stock").isNumeric(),
  createProduct
);

module.exports = route;
