const { Router } = require('express')
const { getProducts } = require('../controllers/productsController')
const route = Router()

route.get('/',  getProducts)

module.exports = route