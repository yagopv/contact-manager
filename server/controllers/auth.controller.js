var User = require("../models/user.model");
var moment = require('moment');
var jwt = require('jwt-simple');
var config = process.env.NODE_ENV ? require('../config/prod') : require('../config/dev');

exports.login = function(req, res) {
    User.findOne({ email: req.body.email }, '+password', function(err, user) {
        if (!user) {
            return res.status(401).send({ message: 'Invalid email and/or password' });
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Invalid email and/or password' });
            }
            res.send({ token: createJWT(user) });
        });
    });
};

exports.signup = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
            return res.status(409).send({ message: 'Email is already taken' });
        }
        var user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password
        });
        user.save(function(err, result) {
            if (err) {
                res.status(500).send({ message: err.message });
            }
            res.send({ token: createJWT(result) });
        });
    });
};

function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.token_secret);
}