import { UserDocument } from "@/models/user";
/**
 * Formats a user profile object for API responses.
 *
 * @param user - The user document to format.
 * @returns An object containing the user's id, name, email, role, createdAt, and updatedAt.
 */
// This function is used to standardize the user profile data returned by the API.
// It ensures that the response contains only the necessary fields and formats them correctly.
// This is particularly useful for maintaining consistency across different parts of the application
// and for preventing sensitive information from being exposed in the API responses.
// It can be used in various parts of the application where user data needs to be displayed,
// such as in user profile pages, admin dashboards, or when returning user data in API responses
// to the frontend.
export const formatUserProfile = (user: UserDocument) => {
  if (!user) {
    return null;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
