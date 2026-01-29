import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export const checkBannedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Better Auth attaches user
    const userId = req.user?.id;

    // If not logged in → skip (public routes)
    if (!userId) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isBanned: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: "Your account has been banned.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
