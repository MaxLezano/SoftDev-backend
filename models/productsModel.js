const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: {
    type: Number,
    required: [true, `El precio es requerido`], 
  },
  category : {type: String, required: true , unique : true ,trim: true},
  description : {type : String, trim : true},
  img: { type: String, required : true, default: "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg" },
  stock: { type: Number, required: true },
  IsAprobed: { type: Boolean, default: false },
});

module.exports = model("product", productSchema);
