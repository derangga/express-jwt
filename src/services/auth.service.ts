import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../db/schema";
import { NewUser } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { env } from "../config/token";

export const registerUser = async (userData: NewUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const [user] = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
    })
    .returning();

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "1h" });
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return { user: userData, token };
};
