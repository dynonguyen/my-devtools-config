const homeRoute = require('express').Router();
const homeController = require('../controllers/home.controller');

homeRoute.get('/', homeController.getHome);

module.exports = homeRoute;
