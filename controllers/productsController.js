const ProductModel = require("../models/productsModel");
const { validationResult } = require("express-validator");


const getAllProducts = async (req, res) => {
   const {limit = 0, from = 0} = req.query
   try {
    const products = await ProductModel.find({}).skip(from).limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getByIdParams = async (req, res) => {
  const { id } = req.params;
  const getById = await ProductModel.findById(id);
  if (getById !== null) {
    res.status(200).json(getById);
  } else {
    res.status(404).json("No se encontro el producto");
  }
};

const createProduct = async (req, res) => {
  const { name, price, category, description, img, stock, isAprobed } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = new ProductModel({
      name: name,
      price: price,
      category : category,
      description : description,
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

const deleteProd = async (req, res) => {
  const { id } = req.body;
  const getById = await ProductModel.findByIdAndDelete(id);
  if (getById !== null) {
    res.status(200).json("Producto eliminado con exito");
  } else {
    res.status(404).json("No se encontro el producto");
  }
};

const deleteProdParams = async (req, res) => {
  const { id } = req.params;
  const getById = await ProductModel.findByIdAndDelete(id);
  if (getById !== null) {
    res.status(200).json("Producto eliminado con exito");
  } else {
    res.status(404).json("No se encontro el producto");
  }
};

const updateById = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const updateProd = await ProductModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  console.log(updateProd);
  if (updateProd !== null) {
    res.status(200).json({ msg: "Producto actualizado con exito", updateProd });
  } else {
    res.status(404).json("No se encontro el producto");
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProd,
  deleteProdParams,
  getByIdParams,
  updateById,
};
