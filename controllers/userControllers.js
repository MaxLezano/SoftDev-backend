const UserModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const getUsers = async (req, res) => {
  try {
   const results = await UserModel.find({})
   res.status(200).json(results)
  } catch (error) {
   res.status(404).json(error)
  };
}; 

const getById = async (req, res) => {
  const { id } = req.params
  const getUserById = await UserModel.findById(id)
  
  if (getUserById !== null) {
      res.status(200).json(getUserById)
  } else {
   res.status(404).json("usuario no encontrado")
  }

};

const addFavorite = async (req, res) => {
const { id } = req.params
const body = req.body
const addFavUser = await UserModel.findByIdAndUpdate(id, body, { new: true })

if (addFavUser !== null) {
   res.status(201).json({msg:"añadido a favoritos", addFavUser})
 } else {
   res.status(404).json("usuario no encontrado")
 }

}
const addCart = async (req, res) => {
	const { id } = req.params
	const body = req.body
	const addCartUser = await UserModel.findByIdAndUpdate(id, body, { new: true })

	if (addCartUser !== null) {
		res.status(201).json({msg:"añadido al carrito", addCartUser})
	} else {
		res.status(404).json("usuario no encontrado")
	}
}

const createUser = async (req, res) => {
	const { name, email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}
	try {
		const user = new UserModel({
			name,
			email,
			password
		});
		const salt = bcrypt.genSaltSync(10)
		user.password = bcrypt.hashSync(password, salt)

		const newUser = await user.save()
		res.status(201).json({ msg: 'Tu cuenta ha sido creada con éxito', name });
	} catch (error) {
		res.status(400).json(error);
	};
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  
  const updateUserById = await UserModel.findByIdAndUpdate(id, body, {new: true});
  if (updateUserById !== null) {
    res.status(200).json({ name: updateUserById.name, msg:"Tu usuario se ha actualizado" });
  } else {
    res.status(404).json("Usuario no encontrado");
  }
}

const deleteUser = async (req, res) => {
   const { id } = req.params
   
   const getById = await UserModel.findByIdAndDelete(id)
   
   if (getById !== null) {
      res.status(200).json("usuario eliminado con exito")
   }else{
      res.status(404).json("usuario no encontrado")
   };
};


module.exports = { getUsers, createUser, deleteUser, getById, updateUser, addFavorite, addCart }