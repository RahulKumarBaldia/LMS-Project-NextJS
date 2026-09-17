import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/auth";
import connectToDb from "@/lib/db";
import User from "@/models/User";

import AdminCourses from "@/components/admin/AdminCourses";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch {
    redirect("/auth");
  }

  await connectToDb();

  const user = await User.findById(decoded.userId)
    .select("-password")
    .lean();

  if (!user) {
    redirect("/auth");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return <AdminCourses />;
}