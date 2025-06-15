import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth";
import "@/db/connect";
import {
  globalErrorHandler,
  notFoundHandler,
} from "@/middlewares/globalErrorHandler";

const app = express();

// Middleware
// Parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes (allows cross-origin requests)
app.use(cors());

// Log HTTP requests in development-friendly format
app.use(morgan("dev"));

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use("/auth", authRouter);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last middleware
app.use(globalErrorHandler);

// Global handlers for uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.error("💥 UNHANDLED REJECTION!");
  console.error(err.name, err.message);
  // In production, you might want to gracefully close the server
  // server.close(() => { process.exit(1); });
});

// Start the server and log the port
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
