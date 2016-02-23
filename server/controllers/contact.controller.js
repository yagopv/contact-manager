const Contact = require("../models/contact.model");

/**
 * Get all the contacts
 * @param req
 * @param res
 */
exports.index = function(req, res) {
    Contact.find({ user: req.user }).sort({"created": -1})
        .exec()
        .catch(err => res.send(400, err.message))
        .then(contact => res.status(200).json(contact));
};

/**
 * Get contact by id
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
    Contact.findById(req.params.id)
        .exec()
        .catch(err => res.send(400, err.message))
        .then(contact => res.status(200).json(contact));
};

/**
 * Add a new contact
 * @param req
 * @param res
 */
exports.create = function(req, res) {
    var contact = new Contact(req.body.contact);
    contact.user = req.user;

    contact.save()
        .catch(err => res.send(400, err))
        .then(contact => res.status(201).json(contact));
};

/**
 * Update contact
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var contact = new Contact(req.body.contact);
    contact.user = req.user;

    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .exec()
        .catch(err => res.send(400, err))
        .then(res.status(200).json(contact));
};

/**
 * Delete contact
 * @param req
 * @param res
 */
exports.remove = function(req, res) {
    Contact.findByIdAndRemove(req.params.id)
        .exec()
        .catch(err => res.send(400, err))
        .then(res.status(200).send());
};