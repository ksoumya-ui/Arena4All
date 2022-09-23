var express =require('express');
var api = express.Router();

const userController = require('../controllers/userController')

api.post('/create',userController.createUser)

module.exports = api;