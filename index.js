const express = require("express");
require("dotenv").config();
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const goalRoutes = require("./routes/goalRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

connectdb();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running" });
});

// api endpoints
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port - ${PORT}`);
});
