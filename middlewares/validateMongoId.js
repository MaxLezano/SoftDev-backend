const mongoose = require('mongoose')

const validateMongoId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("id inválido")
  }else{
    next()
  }
}

module.exports = { validateMongoId }