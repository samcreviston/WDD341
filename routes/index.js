const routes = require('express').Router();

const myController= require('../controllers');

routes.use('/contacts', require('./contacts'));

routes.get('/', myController.awesomeFunction);

module.exports = routes;