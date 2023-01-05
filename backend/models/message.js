const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
   name: { type: String, required: true },
   phone: { type: String, required: true },
   email: { type: String },
   message: { type: String } 
});

module.exports = mongoose.model("Message", messageSchema);