var express =require('express');
var api = express.Router();

const feedController = require('../controllers/feedController')

api.post('/create',feedController.createfeed);
api.get('/fetch_all',feedController.fetchFeed);
api.get('/fetch/:user',feedController.getUserFeed);
api.post('/like/:id',feedController.addLike);
api.post('/download/:id',feedController.addDownload);
api.post('/view/:id',feedController.addViewer);

module.exports = api;