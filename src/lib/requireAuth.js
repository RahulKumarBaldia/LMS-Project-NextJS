import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import connectToDb from "@/lib/db";
import User from "@/models/User";

/**
 * Server-side auth gate for App Router pages.
 * Redirects guests to /auth before any page UI is rendered.
 */
export async function requireAuth(options = {}) {
  const { nextPath = "/assistant", roles } = options;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  }

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch {
    redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  }

  await connectToDb();

  const user = await User.findById(decoded.userId)
    .select("-password")
    .lean();

  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  }

  if (roles?.length && !roles.includes(user.role)) {
    redirect("/dashboard");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
