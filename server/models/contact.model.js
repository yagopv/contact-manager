/**
 * Contact schema
 * @type {*|exports|module.exports}
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Define Phone subdoc
var PhoneSchema = new Schema({
    number: Number,
    kind : { type: "String", enum: ["work", "home", "mobile", "fax"]},
    created: { type: "Date", default: Date.now() }
});

//Define Email subdoc
var EmailSchema = new Schema({
    email: String,
    kind : { type: "String", enum: ["work", "personal", "other"]},
    created: { type: "Date", default: Date.now() }
});

EmailSchema.path("email").validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, "The email is not valid")

//Define address subdoc
var AddressSchema = new Schema({
    street: [ String ],
    postalCode: String,
    city: String,
    state: String,
    country: String,
    kind : { type: "String", enum: ["personal", "work", "other"]},
    created: { type: "Date", default: Date.now() }
});

//Contact Schema
var ContactSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String },
    web: { type: String },
    birthday: { type : Date },
    phones: [ PhoneSchema ],
    emails: [ EmailSchema ],
    addresses: [ AddressSchema ],
    notes: [ String ],
    user: [ String ],
    created: { type: "Date", default: Date.now() }
});

module.exports = mongoose.model("Contact", ContactSchema);