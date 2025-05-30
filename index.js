const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const goalRoutes = require("./routes/goalRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const StartServer = async () => {
  try {
    await connectdb();

    app.use(cookieParser());
    app.use(express.json());
    app.use(
      cors({
        origin: ["http://localhost:3000", "https://stride-eta.vercel.app"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

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
  } catch (error) {
    console.log("server error -", error);
    process.exit(1);
  }
};

StartServer();
