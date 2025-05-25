const express = require("express");
require("dotenv").config();
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// connectdb();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running" });
});

// api endpoints
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port - ${PORT}`);
});
