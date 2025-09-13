import { Model, model, ObjectId, Schema } from "mongoose";

interface AuthorDocument {
  userId: ObjectId;
  name: string;
  about: string;
  slug: string;
  socialLinks: string[];
  books: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<AuthorDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    socialLinks: { type: [String], default: [] },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const AuthorModel = model("Author", AuthorSchema);
export default AuthorModel as Model<AuthorDocument>;
