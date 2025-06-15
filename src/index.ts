import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth";
import "@/db/connect";
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
// 404 handler
// Handle 404 errors for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
// Centralized error handler for unexpected server errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log stack trace for debugging
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server and log the port
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
