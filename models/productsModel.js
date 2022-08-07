const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: {
    type: Number,
    required: [true, `El precio es requerido`], 
  },
  category : {type: String, required: true, trim: true},
  description : {type : String, trim : true},
  img: { type: String, required : true, default: "https://cbff-teco-strapi-cms-pro.s3.amazonaws.com/Moto_G200_Morado_Frente_min_8f360be1e8.png" },
  imgFavorite: { type: String, default: "https://cbff-teco-strapi-cms-pro.s3.amazonaws.com/Moto_G200_Morado_Frente_min_8f360be1e8.png" },
  stock: { type: Number, required: true },
  isAproved: { type: Boolean, default: false },
});

module.exports = model("product", productSchema);
