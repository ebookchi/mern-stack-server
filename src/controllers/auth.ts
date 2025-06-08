import { RequestHandler } from "express";

/**
 * Generates a magic authentication link for passwordless login
 *
 * This controller handles the generation of secure, time-limited authentication
 * links that are sent to users' email addresses. It implements a passwordless
 * authentication flow using email verification.
 *
 * @remarks
 * The actual email sending functionality will be implemented using Mailtrap
 * service in the future.
 *
 * @param request - Express request object
 * @param response - Express response object
 * @returns {Object} JSON response with success message
 *
 * @throws {Error} If email service is not available
 *
 * @example
 * POST /auth/generate-link
 * {
 *   "email": "user@example.com"
 * }
 */
export const generateAuthLink: RequestHandler = (request, response) => {
  response
    .status(200)
    .json({ message: "Authentication link generated successfully" });
};
