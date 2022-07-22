const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
const port = process.env.PORT;
const morgan = require("morgan");
const productsRoutes = require("../routes/products.routes");
require("../dataBase/conection");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`servidor en puerto ${port}`);
});
