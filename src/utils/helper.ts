import { UserDocument } from "@/models/user";

export const formatUserProfile = (user: UserDocument) => {
  if (!user) {
    return null;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar?.url,
  };
};
