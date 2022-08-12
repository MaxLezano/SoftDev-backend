const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
const port = process.env.PORT;
const morgan = require("morgan");
const productsRoutes = require("../routes/products.routes");
require("../dataBase/conection");
const userRoutes = require('../routes/users.routes');
const loginRoutes = require('../routes/loginUser.routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
  console.log(`servidor en puerto ${port}`);
});
