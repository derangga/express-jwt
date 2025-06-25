import { Response, NextFunction } from "express";
import { getCurrentUser } from "../services/user.service";
import { CustomRequest } from "../middleware/auth";

export const getMe = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      res.status(404).json({
        status: "not found",
        message: "user not found",
      });
      return;
    }

    const user = await getCurrentUser(req.userId);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
