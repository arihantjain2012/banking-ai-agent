const recommendProduct = (customer, conversionMeta) => {
  const { probability, netFlow } = conversionMeta;

  let product = "Personal Loan";
  let amount = 0;
  let reason = [];

  if (customer.creditScore > 750) {
    reason.push("Excellent credit score");
  } else if (customer.creditScore > 650) {
    reason.push("Good credit score");
  }

  if (customer.income > 120000) {
    amount = 800000;
    reason.push("High income");
  } else if (customer.income > 70000) {
    amount = 400000;
    reason.push("Stable income");
  } else {
    amount = 200000;
  }

  if (netFlow > 30000) {
    reason.push("Strong monthly cash flow");
  }

  if (probability < 0.5) {
    product = "Pre-approved Small Loan";
    amount = Math.min(amount, 150000);
    reason.push("Lower conversion likelihood → smaller entry offer");
  }

  return {
    product,
    amount,
    reason
  };
};

module.exports = { recommendProduct };