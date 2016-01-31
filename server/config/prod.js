/**
 * production settings will be load in the proper enviroment
 * @type {{connection: string}}
 */
var config = {
    connection: process.env.MONGO_URI,
    token_secret: process.env.TOKEN_SECRET,
    google_secret: process.env.GOOGLE_SECRET

};

module.exports = config;