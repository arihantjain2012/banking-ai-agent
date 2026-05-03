const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  income: Number,
  creditScore: Number,
  city: String
});

module.exports = mongoose.model("Customer", customerSchema);