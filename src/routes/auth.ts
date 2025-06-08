/**
 * Authentication Router Module
 *
 * Manages all authentication-related routes including link-based authentication,
 * user verification, and session handling. This module serves as the central
 * routing hub for the authentication system.
 *
 * Endpoints:
 * - POST /generate-link: Creates magic link for passwordless authentication
 *
 * @module routes/auth
 * @requires express
 * @requires controllers/auth
 */

import { generateAuthLink } from "@/controllers/auth";
import { emailValidationSchema, validate } from "@/middlewares/validator";
import { Router } from "express";

/**
 * Express Router configuration for authentication endpoints.
 * This router should be mounted at '/auth' in the main application.
 *
 * Usage example:
 * ```typescript
 * app.use('/auth', authRouter);
 * ```
 *
 * @constant {Router}
 */
const authRouter = Router();

/**
 * POST /generate-link
 * Generates a magic authentication link for passwordless login.
 *
 * @route POST /generate-link
 * @param {Object} req.body.email - User's email address
 * @returns {200} - Success response with message
 * @returns {400} - Validation error
 * @returns {500} - Server error
 * @see {@link generateAuthLink} for implementation details
 */

authRouter.post(
  "/generate-link",
  validate(emailValidationSchema), // Validate incoming request body against the email schema
  generateAuthLink
);

// Export the router for use in the main application
export default authRouter;
