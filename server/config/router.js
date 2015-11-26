/**
 * Define express app routes
 * @type {exports|module.exports}
 */
var indexController = require("../controllers/index.controller");
var contactController = require("../controllers/contact.controller");

var express = require('express');
var router = express.Router();

module.exports = function(app) {

    router.route("/").get(indexController.index);

    router.route("/api/contact")
        .get(contactController.index)
        .post(contactController.create)

    router.route("/api/contact/:id")
        .get(contactController.findById)
        .put(contactController.update)
        .delete(contactController.remove);

    app.use(router);
};