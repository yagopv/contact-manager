/**
 * Define express app routes
 * @type {exports|module.exports}
 */
var indexController = require("../controllers/index.controller");
var contactController = require("../controllers/contact.controller");
var userController = require("../controllers/user.controller");
var authController = require("../controllers/auth.controller");

var express = require('express');
var router = express.Router();
var config = process.env.NODE_ENV ? require('../config/prod') : require('../config/dev');
var moment = require('moment');
var jwt = require('jwt-simple');

module.exports = function(app) {

    router.route("/").get(indexController.index);

    router.route("/api/contact")
        .get(ensureAuthenticated, contactController.index)
        .post(ensureAuthenticated, contactController.create);

    router.route("/api/contact/:id")
        .get(ensureAuthenticated,contactController.findById)
        .put(ensureAuthenticated, contactController.update)
        .delete(ensureAuthenticated, contactController.remove);

    router.route("/api/me")
        .get(ensureAuthenticated, userController.findById)
        .put(ensureAuthenticated, userController.update);

    router.route("/auth/login")
        .post(authController.login);

    router.route("/auth/signup")
        .post(authController.signup);

    app.use(router);
};

function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.headers.authorization.split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.token_secret);
    }
    catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}
