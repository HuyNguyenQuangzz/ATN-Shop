const mongoose = require("mongoose")

var DollSchema = new mongoose.Schema({
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

var DollSchema = mongoose.model('doll', DollSchema, 'doll')
module.exports = DollSchema
