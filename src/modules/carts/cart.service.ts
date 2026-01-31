import { prisma } from "../../lib/prisma";

const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  return cart;
};

const addToCart = async (
  userId: string,
  medicineId: string,
  quantity: number,
) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      medicineId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        medicineId,
        quantity,
      },
    });
  }

  return getOrCreateCart(userId);
};

const updateQuantity = async (
  userId: string,
  itemId: string,
  quantity: number,
) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getOrCreateCart(userId);

  return prisma.cartItem.updateMany({
    where: {
      id: itemId,
      cartId: cart.id,
    },
    data: { quantity },
  });
};

const removeFromCart = async (userId: string, itemId: string) => {
  const cart = await getOrCreateCart(userId);

  await prisma.cartItem.deleteMany({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });
};

export const cartService = {
  getOrCreateCart,
  addToCart,
  updateQuantity,
  removeFromCart,
};