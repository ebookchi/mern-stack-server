import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error details for debugging
  console.error("🚨 Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Prevent duplicate response sending
  if (res.headersSent) {
    return next(err);
  }

  // Handle different types of errors
  if (err.name === "ValidationError") {
    // Mongoose validation error
    return res.status(400).json({
      status: "fail",
      message: "Validation Error",
      details: err.message,
    });
  }

  if (err.name === "CastError") {
    // Mongoose cast error (invalid ObjectId)
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID format",
    });
  }

  if ((err as any).code === 11000) {
    // MongoDB duplicate key error
    return res.status(400).json({
      status: "fail",
      message: "Duplicate value provided",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Token expired",
    });
  }

  // Default error response
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (isDevelopment) {
    // In development, send detailed error info
    return res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
    });
  } else {
    // In production, send limited error info
    if (err.isOperational) {
      return res.status(err.statusCode!).json({
        status: err.status,
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: AppError = new Error(
    `Cannot find ${req.originalUrl} on this server!`
  );
  error.statusCode = 404;
  error.status = "fail";
  error.isOperational = true;

  next(error);
};

export class AppErrorClass extends Error implements AppError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
