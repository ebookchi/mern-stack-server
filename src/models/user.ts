import { ObjectId, model, Schema } from "mongoose";

export enum UserRole {
  user = "user",
  admin = "admin",
  author = "author",
}

export interface UserDocument {
  _id: ObjectId;
  email: string;
  role: UserRole;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  signedUp: boolean;
  avatar: { url: string; id: string };
  authorId?: ObjectId;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, trim: true, required: true, unique: true },
  name: { type: String, trim: true, required: false },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.user,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
  signedUp: { type: Boolean, default: false },
  avatar: { type: Object, url: String, id: String },
  authorId: { type: Schema.Types.ObjectId, ref: "Author", required: false },
});

const userModel = model("User", userSchema);

export default userModel;
