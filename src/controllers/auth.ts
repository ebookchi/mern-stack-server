import { RequestHandler } from "express";
import crypto from "crypto";

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
  //generate authentication link
  //and send it to the user's email using Mailtrap service
  /*
    1. Generate a unique token for the user
    2. Store the token in the database with an expiration time
    3. Create a magic link using the token
    4. Send the magic link to the user's email address
    5. Notify the user that the link has been sent
    6. Return a success response
    */

  const token = crypto.randomBytes(36).toString("hex");
  const expirationTime = Date.now() + 3600000; // 1 hour from now

  const { email } = request.body;

  response
    .status(200)
    .json({ message: "Authentication link generated successfully" });
};
