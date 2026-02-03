import express, { Express } from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1", eventRoutes);

export default app;
