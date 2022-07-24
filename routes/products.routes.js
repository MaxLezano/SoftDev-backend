const { Router } = require("express");
const route = Router();
const {
  getAllProducts,
  createProduct,
  deleteProd,
  getByIdParams,
  updateById,
  deleteProdParams
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

route.delete("/", deleteProd);
route.delete("/:id",deleteProdParams)
route.get("/:ProdId", getByIdParams);
route.patch("/:id", updateById);

module.exports = route;
