const mongoose = require("mongoose");

const partSchema = mongoose.Schema({
    partName: { type: String, required: true },
    cost: { type: Number, required: true },
});

module.exports = mongoose.model("Part", partSchema);