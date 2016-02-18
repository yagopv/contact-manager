/**
 * Initialize mongodb connection using mongoose
 * @type {*|exports|module.exports}
 */
const mongoose = require("mongoose");
const config = process.env.NODE_ENV ? require('../config/prod') : require('../config/dev');

mongoose.connection.on("error", console.log);
mongoose.connection.on("disconnected", connect);
mongoose.Promise = Promise;

connect();

// Connect to mongodb
function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.connection, options);
}