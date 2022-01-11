const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  code: { type: String, required: true},
  topic: String,
  billsplit: Array
});

const User = mongoose.model("User",userSchema);

module.exports = User;
