const UserModel = require('../models/userModel');

const emailUnique = async (email) => {
  const searchEmail = await UserModel.find({email});

  if (searchEmail.length !== 0) {
    throw new Error('el correo ya se encuentra en uso');
  }
  return false;
}

module.exports = { emailUnique };