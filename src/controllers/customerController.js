const Customer = require("../models/Customer");
const { calculateScore } = require("../services/scoringService");
const Transaction = require("../models/Transaction");
const { predictConversion } = require("../services/conversionService");
const { recommendProduct } = require("../services/recommendationService");
const addDummyTransactions = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (customers.length === 0) {
      return res.send("No customers found. Seed customers first.");
    }

    const transactions = [];

    customers.forEach((cust) => {
      transactions.push(
        {
          customerId: cust._id,
          amount: Math.floor(Math.random() * 50000),
          type: "credit",
          date: new Date()
        },
        {
          customerId: cust._id,
          amount: Math.floor(Math.random() * 20000),
          type: "debit",
          date: new Date()
        }
      );
    });

    await Transaction.insertMany(transactions);

    res.send("Dummy transactions added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getHighValueCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    const result = [];

    for (let cust of customers) {
      const score = await calculateScore(cust);

      result.push({
        name: cust.name,
        income: cust.income,
        creditScore: cust.creditScore,
        score
      });
    }

    const filtered = result.filter((c) => c.score >= 60);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const addDummyCustomers = async (req, res) => {
  try {
    await Customer.insertMany([
      { name: "Amit", income: 120000, creditScore: 780, city: "Delhi" },
      { name: "Rohit", income: 60000, creditScore: 680, city: "Mumbai" },
      { name: "Neha", income: 150000, creditScore: 800, city: "Bangalore" }
    ]);

    res.send("Dummy data added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getCustomerByName = async (req, res) => {
  try {
    const { name } = req.params;

    const customer = await Customer.findOne({ name });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getLoanTargets = async (req, res) => {
  try {
    const customers = await Customer.find();

    const results = [];

    for (let cust of customers) {
      const conversion = await predictConversion(cust);

      // Filter: only customers with decent probability
      if (conversion.probability >= 0.5) {
        const recommendation = recommendProduct(cust, conversion);

        results.push({
          name: cust.name,
          income: cust.income,
          creditScore: cust.creditScore,
          probability: conversion.probability,
          netFlow: conversion.netFlow,
          recommendation
        });
      }
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getHighValueCustomers,
  addDummyCustomers,
  addDummyTransactions,
  getCustomerByName,
  getLoanTargets
};