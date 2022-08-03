const { Router } = require("express");
const route = Router();
const {
  getAllProducts,
  createProduct,
  deleteProd,
  getByIdParams,
  updateById,
  deleteProdParams,
} = require("../controllers/productsController");
const { body } = require("express-validator");
const { validateMongoId } = require('../middlewares/validateMongoId')
route.get("/", getAllProducts);
route.post(
  "/",
  body("name").not().isEmpty().withMessage("El campo nombre es requerido").matches(/^[a-zA-ZÀ-ÿ0-9 ]{2,20}$/).withMessage("El texto de Nombre de Producto es incorrecto"),
  body("price")
    .matches(/^[0-9]{1,6}$/)
    .withMessage("El precio no puede superar el millon"),
  body("category").not().isEmpty().withMessage("El campo categoria es requerido").matches(/^[a-zA-ZÀ-ÿ]{2,20}$/).withMessage("El texto de categoria es incorrecto"),
  body("description").not().isEmpty().withMessage("El campo descripción es requerido").matches(/^[a-zA-ZÀ-ÿ ,.]{2,340}$/).withMessage("El texto de descripción es demasiado largo"),
  body("stock")
    .matches(/^[0-9]{1,6}$/)
    .withMessage("El numero de stock es incorrecto"),
  createProduct
);

route.delete("/", deleteProd);
route.delete("/:id",[validateMongoId] ,deleteProdParams);
route.get("/:id",[validateMongoId] ,getByIdParams);
route.patch("/:id", [validateMongoId] ,updateById);

module.exports = route;
