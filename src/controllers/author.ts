import AuthorModel from "@/models/author";
import userModel, { UserRole } from "@/models/user";
import { AuthorRequestHandler } from "@/types";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { RequestHandler } from "express";
import slugify from "slugify";

export const registerAuthor: AuthorRequestHandler = async (
  request,
  response
) => {
  const {
    body: { name, about, socialLinks },
    user,
  } = request;

  if (user && !user.signedUp) {
    return sendErrorResponse({
      response,
      message: "Complete your profile to register as an author",
      status: 401,
    });
  }

  const newAuthor = new AuthorModel({
    name,
    about,
    socialLinks,
    userId: user?._id,
  });

  const uniqueSlug = slugify(`${newAuthor.name}-${newAuthor._id}`, {
    lower: true,
    replacement: "-",
  });

  newAuthor.slug = uniqueSlug;

  await newAuthor.save();

  await userModel.findByIdAndUpdate(user?._id, {
    authorId: newAuthor._id,
    role: UserRole.author,
  });

  response.status(201).json({
    message: "Thank you for registering as an author!",
  });
};

export const getAuthorDetails: RequestHandler = async (request, response) => {
  const { slug } = request.params;
  const author = await AuthorModel.findOne({ slug });

  if (!author) {
    return sendErrorResponse({
      response,
      message: "Author not found",
      status: 404,
    });
  }
  response.json({ author });
};
