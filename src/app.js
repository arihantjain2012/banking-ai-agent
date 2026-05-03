const express = require("express");
const app = express();

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes");

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;