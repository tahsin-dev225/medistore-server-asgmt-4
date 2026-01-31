import express, { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { userRole } from "../../middlewere/auth";

const router = express.Router();

router.get("/", auth(userRole.CUSTOMER), cartController.getMyCart);

router.post("/items", auth(userRole.CUSTOMER), cartController.addToCart);

router.patch(
  "/items/:itemId",
  auth(userRole.CUSTOMER),
  cartController.updateQuantity,
);

router.delete(
  "/items/:itemId",
  auth(userRole.CUSTOMER),
  cartController.removeFromCart,
);

export const cartRouter: Router = router;