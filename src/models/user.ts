import { ObjectId, model, Schema } from "mongoose";
import { object } from "zod/v4";

export interface UserDocument {
  _id: ObjectId;
  email: string;
  role: "user" | "admin" | "author";
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  signedUp: boolean;
  avatar: { url: string; id: string };
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, trim: true, required: true, unique: true },
  name: { type: String, trim: true, required: false },
  role: {
    type: String,
    enum: ["user", "admin", "author"],
    default: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
  signedUp: { type: Boolean, default: false },
  avatar: { type: Object, url: String, id: String },
});

const userModel = model("user", userSchema);

export default userModel;
