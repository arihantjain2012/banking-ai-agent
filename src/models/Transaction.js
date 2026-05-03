const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  amount: Number,
  type: String, // credit / debit
  date: Date
});

module.exports = mongoose.model("Transaction", transactionSchema);