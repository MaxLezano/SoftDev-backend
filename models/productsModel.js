const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: {
    type: Number,
    required: [true, `El precio es requerido`],
    minlenght: 1,
    maxlenght: 1000000,
  },
  img: { type: String },
  stock: { type: Number, minlenght: 1, maxlenght: 100000 },
  IsAprobed: { type: Boolean, default: false },
});

module.exports = model("product", productSchema);
