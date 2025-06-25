import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUser = async (userId: number) => {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
