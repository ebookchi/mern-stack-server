/**
 * MongoDB Connection Module
 * Handles database connection initialization and error handling.
 *
 * @module db/index
 */

import mongoose from "mongoose";

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI environment variable is not set");

/**
 * Initializes MongoDB connection using mongoose
 * Handles connection success and error cases
 *
 * @function dbConnect
 * @throws {Error} If connection fails
 */
export const dbConnect = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process if connection fails
    });
};
