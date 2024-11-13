
const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController')
const userController = require('../controller/userController')
const authController = require('../controller/authController')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/home', userController.home)
router.get('/auth',authController.verifyJWT,(req,res) => res.status(200).json({}))
router.post('/cart',cartController.cart)
router.get('/cart/:id',cartController.getProductById)
router.get('/cart',cartController.getAllProducts)
router.delete('/cart/:id',cartController.deleteById)


module.exports = router