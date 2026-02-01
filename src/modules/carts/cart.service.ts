import { prisma } from "../../lib/prisma";

const addToCart = async (
  customerId: string,
  medicineId: string,
  quantity: number
) => {
  
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  const cart = await prisma.cart.upsert({
    where: { customerId },
    update: {},
    create: { customerId },
  });

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_medicineId: {
        cartId: cart.id,
        medicineId,
      },
    },
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: cartItem.quantity + quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        medicineId,
        quantity,
        price: medicine.price,
      },
    });
  }

  return await prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      items: {
        include: { medicine: true },
      },
    },
  });
};
const getOrCreateCart = async (customerId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId },
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
      data: { customerId },
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


const updateQuantity = async (
  customerId: string,
  itemId: string,
  quantity: number,
) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await getOrCreateCart(customerId);

  return prisma.cartItem.updateMany({
    where: {
      id: itemId,
      cartId: cart.id,
    },
    data: { quantity },
  });
};

const removeFromCart = async (customerId: string, itemId: string) => {
  const cart = await getOrCreateCart(customerId);

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