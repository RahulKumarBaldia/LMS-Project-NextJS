import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { getJwtSecret } from "@/lib/env";

export const isAuthenticated = async (request) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return {
      authenticated: false,
      user: null,
    };
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return {
      authenticated: true,
      user: {
        id: user._id,
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch {
    return {
      authenticated: false,
      user: null,
    };
  }
};
