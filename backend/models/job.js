const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    date: { type: String, required: true },
    customer: { type: String, required: true },
    hours: { type: Number },
    notes: { type: String },
    parts: { type: Number }
});

module.exports = mongoose.model("Job", jobSchema);