const Transaction = require("../models/Transaction");

const predictConversion = async (customer) => {
  let score = 0;

  // Income factor
  if (customer.income > 100000) score += 30;
  else if (customer.income > 60000) score += 20;

  // Credit score factor
  if (customer.creditScore > 750) score += 30;
  else if (customer.creditScore > 650) score += 20;

  // Transaction behavior (liquidity / activity)
  const txns = await Transaction.find({ customerId: customer._id });

  const totalCredit = txns
    .filter(t => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);

  const totalDebit = txns
    .filter(t => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);

  const netFlow = totalCredit - totalDebit;

  if (netFlow > 30000) score += 30;     // strong cash inflow
  else if (netFlow > 10000) score += 20;

  // Normalize to probability (0–1)
  const probability = Math.min(score / 100, 1);

  return { probability, netFlow, totalCredit, totalDebit };
};

module.exports = { predictConversion };