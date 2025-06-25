import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/token";

export interface CustomRequest extends Request {
  userId?: number;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authentication required");
    }

    const user = jwt.verify(token, env.JWT_SECRET) as { id: number };

    if (!user) {
      throw new Error("User not found");
    }

    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed." });
  }
};

export default auth;
