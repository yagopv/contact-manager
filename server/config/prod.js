/**
 * production settings will be load in the proper enviroment
 * @type {{connection: string}}
 */
var config = {
    //process.env.MONGO_URI
    connection : 'mongodb://MongoLab-0:5lRHvUnXLyKDGNOVBJqMKrHFM2EPPc9mpJ0xyAvVLGI-@ds034348.mongolab.com:34348/MongoLab-0',
    //process.env.TOKEN_SECRET
    token_secret : 'YOUR_UNIQUE_JWT_TOKEN_SECRET'

};

module.exports = config;