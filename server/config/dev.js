/**
 * dev settings will be loaded in development environment
 * @type {{connection: string}}
 */
var config = {
    connection: "mongodb://localhost/contact-manager",
    token_secret: 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
    google_secret: 'AskWCgtVQw--8HvRW_GquZ5H'
};

module.exports = config;