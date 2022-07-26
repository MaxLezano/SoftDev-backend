const UserModel = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')


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

const createUser = async (req, res) => {
   const {email, password, isAproved, nameCompleted, numberContact, codigoPostal, direction, dateCreated} = req.body

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
   }
  
   try {
      const user = new UserModel({
         email,
         password,
         isAproved,
         nameCompleted,
         numberContact,
         codigoPostal,
         direction,
         dateCreated
      })
      
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(password, salt)

      const newUser = await user.save()
      res.status(201).json('usuario creado con exito')
   } catch (error) {
      res.status(400).json(error)
   };
};

const updateUser = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const { password} = req.body

    const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
   }
   const salt = bcrypt.genSaltSync(10)
   req.body.password = bcrypt.hashSync(password, salt)
    
   const updateUserById = await UserModel.findByIdAndUpdate(id, body, {new: true})
    if (updateUserById !== null) {
      res.status(200).json({mesg:"usuario actualizado", updateUserById})
    } else {
      res.status(404).json("usuario no encontrado")
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


module.exports = { getUsers, createUser, deleteUser, getById, updateUser }