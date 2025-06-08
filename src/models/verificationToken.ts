/**
 * Verification Token Model
 *
 * Defines the schema for storing authentication tokens used in the magic link
 * authentication flow. Each token is associated with a user and has an expiration time.
 *
 * @module models/verificationToken
 */

import { model, Schema } from "mongoose";

/**
 * Verification Token Schema
 * @property {String} token - Unique token string
 * @property {String} userId - Associated user identifier
 * @property {Date} expiresAt - Token expiration timestamp
 * @property {Date} createdAt - Token creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
const verificationTokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: Date.now(),
      expires: 60 * 60 * 24, // Token expires after 24 hours
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const VerificationTokenModel = model(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationTokenModel;
