/**
 * Define express app routes
 * @type {exports|module.exports}
 */
const indexController = require("../controllers/index.controller");
const contactController = require("../controllers/contact.controller");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const express = require('express');
const router = express.Router();
const config = process.env.NODE_ENV ? require('../config/prod') : require('../config/dev');

module.exports = function(app) {

    router.route("/").get(indexController.index);

    router.route("/api/contact")
        .get(authController.ensureAuthenticated, contactController.index)
        .post(authController.ensureAuthenticated, contactController.create);

    router.route("/api/contact/:id")
        .get(authController.ensureAuthenticated,contactController.findById)
        .put(authController.ensureAuthenticated, contactController.update)
        .delete(authController.ensureAuthenticated, contactController.remove);

    router.route("/api/me")
        .get(authController.ensureAuthenticated, userController.findById)
        .put(authController.ensureAuthenticated, userController.update);

    router.route("/auth/login").post(authController.login);

    router.route("/auth/signup").post(authController.signup);

    router.route("/auth/google").post(authController.google);

    router.route("/auth/unlink")
        .post(authController.ensureAuthenticated, authController.unlink);

    app.use(router);
};
