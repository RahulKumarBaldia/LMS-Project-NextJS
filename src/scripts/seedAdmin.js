import bcrypt from "bcryptjs";

import connectToDb from "@/lib/db";
import User from "@/models/User";
import { isProduction } from "@/lib/env";

export default async function seedAdmin() {
  await connectToDb();

  const name = process.env.ADMIN_NAME || "Admin";
  const email = (
    process.env.ADMIN_EMAIL || "admin@brand.com"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (isProduction()) {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        "In production, ADMIN_EMAIL and ADMIN_PASSWORD are required to seed admin"
      );
    }
  }

  const resolvedPassword = password || "Admin@123456";

  if (resolvedPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    existingUser.name = name;
    existingUser.role = "admin";
    existingUser.password = await bcrypt.hash(resolvedPassword, 10);
    await existingUser.save();

    return {
      created: false,
      updated: true,
      email: existingUser.email,
      role: existingUser.role,
    };
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(resolvedPassword, 10),
    role: "admin",
  });

  return {
    created: true,
    updated: false,
    email: user.email,
    role: user.role,
  };
}
