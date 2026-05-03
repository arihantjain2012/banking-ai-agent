const Transaction = require("../models/Transaction");

const calculateScore = async (customer) => {
  let score = 0;

  // Basic factors
  if (customer.income > 100000) score += 30;
  if (customer.creditScore > 750) score += 30;

  // Transaction behavior
  const transactions = await Transaction.find({ customerId: customer._id });

  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  if (totalCredit > 50000) score += 40;

  return score;
};

module.exports = { calculateScore };