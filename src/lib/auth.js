import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/env";

export const createToken = (userId) => {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
