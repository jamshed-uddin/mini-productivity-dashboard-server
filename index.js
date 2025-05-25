const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port - ${PORT}`);
});
