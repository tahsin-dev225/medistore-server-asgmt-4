import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";

const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.user?.id;
    const { medicineId, quantity } = req.body;

    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!medicineId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const cart = await cartService.addToCart(
      customerId,
      medicineId,
      quantity
    );

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const getMyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;

    const cart = await cartService.getOrCreateCart(user.id);

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const result = await cartService.updateQuantity(
      user.id,
      itemId as string,
      quantity,
    );

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!;
    const { itemId } = req.params;

    await cartService.removeFromCart(user.id, itemId as string);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

export const cartController = {
  getMyCart,
  addToCart,
  updateQuantity,
  removeFromCart,
};