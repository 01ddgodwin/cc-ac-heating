const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number },
    email: { type: String },
    address: { type: String, required: true },
});

module.exports = mongoose.model("Customer", customerSchema);