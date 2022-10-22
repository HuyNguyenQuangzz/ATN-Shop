const mongoose = require("mongoose")

var CustomerSchema = new mongoose.Schema({
    fullname: String,
    gender: String,
    dob: Date,
    email: String,
    address: String,
    image: String
}, {
    versionKey: false
})

var CustomerSchema = mongoose.model('customer', CustomerSchema, 'customer')
module.exports = CustomerSchema
