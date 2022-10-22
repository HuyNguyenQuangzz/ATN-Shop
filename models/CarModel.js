const mongoose = require("mongoose")

var CarSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    dob: Date,
    category: String,
    supplier: String,
    available: Boolean,
    image: String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var CarSchema = mongoose.model('car', CarSchema, 'car')
module.exports = CarSchema
