import { formatUserProfile } from "./../utils/helper";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { RequestHandler } from "express";
import crypto from "crypto";
import VerificationTokenModel from "@/models/verificationToken";
import userModel from "@/models/user";
import nodeMailer from "nodemailer";
import { generateVerificationEmail } from "@/templates/emails/verificationEmail";
import mail from "@/utils/mail";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

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
export const generateAuthLink: RequestHandler = async (request, response) => {
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

  let user = await userModel.findOne({ email });
  if (!user) {
    //create user if not exists
    user = await userModel.create({ email });
  }
  const userId = user._id.toString();

  // Check if a verification token already exists for the user, and delete it
  // to ensure only one active token per user at a time
  await VerificationTokenModel.findOneAndDelete({
    userId,
  });

  // Create a new verification token for the user
  await VerificationTokenModel.create<{ userId: string }>({
    token,
    userId: userId, // Assuming userId is the email for simplicity
    expiresAt: new Date(expirationTime),
  });

  let link = `${process.env.APP_URI}:${process.env.PORT}/auth/verify?token=${token}&userId=${userId}`;

  // Ensure APP_URI and PORT are defined before using includes to avoid runtime errors,
  // This is to ensure that the link is correctly formatted for github codespaces
  if (
    typeof process.env.APP_URI === "string" &&
    typeof process.env.PORT === "string" &&
    process.env.APP_URI.includes(process.env.PORT)
  ) {
    link = `${process.env.APP_URI}/auth/verify?token=${token}&userId=${userId}`;
  }

  await mail.sendVerificationEmail({
    to: email,
    content: generateVerificationEmail(link),
  });

  response
    .status(200)
    .json({ message: "Authentication link generated successfully" });
};

export const verifyAuthToken: RequestHandler = async (request, response) => {
  const { token, userId } = request.query;

  if (typeof token !== "string" || typeof userId !== "string") {
    return sendErrorResponse({
      response,
      message: "Invalid request parameters. Token and userId must be strings.",
      status: StatusCodes.FORBIDDEN,
    });
  }

  if (!token || !userId) {
    return response
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Invalid request parameters" });
  }

  const verificationTokenModel = await VerificationTokenModel.findOne({
    userId,
  });

  if (!verificationTokenModel || !verificationTokenModel.compareToken(token)) {
    return sendErrorResponse({
      response,
      message:
        "Invalid or expired token. Please request a new authentication link.",
      status: StatusCodes.FORBIDDEN,
    });
  }

  if (verificationTokenModel.expiresAt < new Date()) {
    return response
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Token has expired" });
  }

  const user = await userModel.findById(userId);
  if (!user) {
    return sendErrorResponse({
      response,
      message: "User not found",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  // Token is valid, proceed with authentication logic
  // For example, create a session or issue a JWT

  // Clean up the used token
  await VerificationTokenModel.deleteOne({ _id: verificationTokenModel._id });

  const payload = { userId: user._id.toString() };
  jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: "15d" },
    (err, token) => {
      if (err) {
        return sendErrorResponse({
          response,
          message: "Error generating authentication token",
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict", // Prevent CSRF attacks
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      });
      response.redirect(
        `${process.env.AUTH_SUCCESS_URL}?profile=${JSON.stringify(
          formatUserProfile(user)
        )}`
      );
    }
  );
};
