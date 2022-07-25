const mongoose = require('mongoose');
require("dotenv/config");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_CONNECTION);
    console.log("Conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};

connectionDB();
