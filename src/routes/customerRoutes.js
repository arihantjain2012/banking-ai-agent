const express = require("express");
    const router = express.Router();

const { getHighValueCustomers, getCustomerByName,addDummyCustomers,addDummyTransactions ,getLoanTargets} = require("../controllers/customerController");

router.get("/high-value", getHighValueCustomers);
router.post("/add-dummy", addDummyCustomers);
router.get("/seed", addDummyCustomers);
router.get("/seed-transactions", addDummyTransactions);
router.get("/customer/:name", getCustomerByName);
router.get("/loan-targets", getLoanTargets);

module.exports = router;