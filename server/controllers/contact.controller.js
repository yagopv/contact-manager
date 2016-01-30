var Contact = require("../models/contact.model");

/**
 * Get all the contacts
 * @param req
 * @param res
 */
exports.index = function(req, res) {
    Contact.find({}).sort({"created": -1}).exec(function(err, contact) {
        if (err) {
            res.send(400, err.message);
        }
        res.status(200).json(contact);
    });
};

/**
 * Get contact by id
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
    Contact.findById(req.params.id, function(err, contact) {
        if (err) {
            res.send(400, err.message);
        }
        res.status(200).json(contact);
    });
};

/**
 * Add a new contact
 * @param req
 * @param res
 */
exports.create = function(req, res) {
    var contact = new Contact(req.body.contact);

    contact.save(function(err, contact) {
        if (err) {
            res.send(400, err);
        }
        res.status(201).json(contact);
    });
};

/**
 * Update contact
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body.contact, { new: true}, function(err, contact) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            contact.save(function(err, contact) {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).json(contact);
            });
        }
    });
};

/**
 * Delete contact
 * @param req
 * @param res
 */
exports.remove = function(req, res) {
    Contact.findByIdAndRemove(req.params.id, function(err, contact) {
        if (err) {
            res.send(400, err.message);
        }
        res.status(200).send();
    });
};