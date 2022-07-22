const Product = require("../models/productsModel");
const { validationResult } = require("express-validator");
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};

const createProduct = async (req, res) => {
  const { name, price, img, stock, isAprobed } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = new Product({
      name: name,
      price: price,
      img: img,
      stock: stock,
      isAprobed: isAprobed,
    });
    const newProd = await product.save();
    res.status(201).json({ msg: "Producto creado con exito", newProd });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllProducts, createProduct };
