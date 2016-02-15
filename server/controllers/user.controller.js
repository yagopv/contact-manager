const User = require("../models/user.model");

exports.findById = function (req, res) {
    User.findById(req.user, function(err, user) {
        res.send(user);
    });
};

exports.update = function(req, res) {
    User.findById(req.user, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.save(function(err) {
            res.status(200).end();
        });
    });
};