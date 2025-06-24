import { ObjectId, model, Schema } from "mongoose";

export interface UserDocument {
  _id: ObjectId;
  email: string;
  role: "user" | "admin" | "author";
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, trim: true, required: false },
  role: {
    type: String,
    enum: ["user", "admin", "author"],
    default: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = model("user", userSchema);

export default userModel;
