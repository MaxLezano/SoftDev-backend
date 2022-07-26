const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator')

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req)
  const searchEmail = await UserModel.findOne({ email });
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  if (searchEmail) {
    const match = bcrypt.compareSync(password, searchEmail.password);
    if (match) {
      const payload = {
        id: searchEmail._id,
        email: searchEmail.email,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 600,
      });
      res.status(200).json({ msg: "login exitoso", token: token });
    } else {
      res.status(401).json("Verifica los datos");
    }
  } else {
    return res.status(404).json("Usuario o contraseña incorrecta");
  }
};

module.exports = {
  login,
};
