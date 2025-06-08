import { model, Schema } from "mongoose";
const userSchema = new Schema({
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
