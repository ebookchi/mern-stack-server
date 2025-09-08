import { model, Schema, Model } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcrypt";

interface VerificationTokenDocument {
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Methods {
  compareToken(token: string): boolean;
}

const verificationTokenSchema = new Schema<
  VerificationTokenDocument,
  {},
  Methods
>(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: Date.now(),
      expires: 60 * 60 * 24, // Token expires after 24 hours
    },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

verificationTokenSchema.pre("save", function (next) {
  // Automatically set the updatedAt field to the current date
  this.updatedAt = new Date();

  // If the token is new, set createdAt to the current date
  if (this.isNew) {
    this.createdAt = new Date();
  }

  // If the token is modified, hash it before saving
  if (this.isModified("token")) {
    // Hash the token before saving it to the database
    this.token = hashSync(this.token, genSaltSync(10));
  }

  // Call the next middleware function
  next();
});

verificationTokenSchema.methods.compareToken = function (token: string) {
  // Compare the provided token with the hashed token in the database
  return compareSync(token, this.token);
};

// Create the VerificationToken model using the defined schema
const VerificationTokenModel = model(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationTokenModel as Model<
  VerificationTokenDocument,
  {},
  Methods
>;
