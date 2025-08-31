import express from "express";
import { AppDB } from "./db";
import appRoutes  from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json({}));
app.use("/uploads", express.static("src/uploads"));
app.use(cors());
// Start server
AppDB.initialize()
  .then(() => {
    console.log("Database connected ✅");

    app.use("/api/v1", (appRoutes));

    app.listen(PORT, () => {
      console.log("Server running on http://localhost:" + PORT);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
