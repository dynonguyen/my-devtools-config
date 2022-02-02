const mainRoute = require('express').Router();
const mainController = require('../controllers/main.controller');

mainRoute.get('/', mainController.getHomePage);

module.exports = mainRoute;
