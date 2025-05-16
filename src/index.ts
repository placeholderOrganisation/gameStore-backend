import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "./routes/games";
import healthRoutes from "./routes/health";
import sheetsRoutes from "./routes/googleSheets";
import emailRoutes from "./routes/emailRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/games", gameRoutes);
app.use("/email", emailRoutes);
app.use("/sheets", sheetsRoutes);
app.use("/_health", healthRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/game-store")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
