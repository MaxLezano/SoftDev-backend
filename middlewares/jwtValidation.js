const jwt = require('jsonwebtoken');

const jwtValidator = async (req,res,next) => {
  const token = req.headers['access-token'];
  if (token){
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err){
        res.status(401).json("token inválido");
      } else {
        next();
      }
    })
  } else {
    res.status(400).json("token inexistente");
  }
}

module.exports = { jwtValidator };