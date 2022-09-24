var express =require('express');
var api = express.Router();

const userController = require('../controllers/userController')

api.post('/signup',userController.createUser)
api.post('/login',userController.createUser)

module.exports = api;