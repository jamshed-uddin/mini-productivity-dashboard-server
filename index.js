const express = require("express");
const connectdb = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// connectdb()

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port - ${PORT}`);
});
