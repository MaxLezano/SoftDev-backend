const { Router } = require('express')
const { getUsers, createUser, deleteUser, getById, updateUser } = require('../controllers/userControllers')
const { body } = require('express-validator')
const { emailUnique } = require('../helpers/validation')
const route = Router()

route.get('/', getUsers)
route.get('/:id', getById)

route.post('/',
body("email").not().isEmpty().withMessage("el campo mail es requerido")
.isEmail().withMessage("ingrese un mail Valido").custom(emailUnique),
createUser)

route.delete('/:id', deleteUser)

route.put('/:id', updateUser)



module.exports = route
