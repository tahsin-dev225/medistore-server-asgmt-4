import { Order } from "../../../generated/prisma/client";
import {  OrderWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createOrder = async (customerId: string) => {

  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  const orders = [];

  for (const item of cart.items) {
    const totalPrice = item.quantity * item.medicine.price;

    const order = await prisma.order.create({
      data: {
        medicineId: item.medicineId,
        customerId,
        sellerId: item.medicine.sellerId,
        quantity: item.quantity,
        unitPrice: item.medicine.price,
        totalPrice,
      },
    });

    orders.push(order);
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return orders;
};

const getCustomerOrder = async (
customerId : string) => {
    const andConditions: OrderWhereInput[] = []


    if (customerId) {
        andConditions.push({
            customerId 
        })
    }

    const sellerAllOrder = await prisma.order.findMany({
        where: {
            customerId
        },
    });

    return {
        data : sellerAllOrder
    };
};

const getSellerOrder = async (
sellerId : string) => {
    const andConditions: OrderWhereInput[] = []
    if (sellerId) {
        andConditions.push({
            sellerId 
        })
    }

    const sellerAllOrder = await prisma.order.findMany({
        where: {
            sellerId
        },
    });

    return {
        data : sellerAllOrder
    };
};

const getAllOrder = async ({
    sortBy,
    sortOrder
}: {
    sellerId: string | undefined,
    sortBy : string,
    sortOrder : string 
}) => {

    const allOrder = await prisma.order.findMany({
        orderBy : {
          [sortBy] : sortOrder
        }
    });

    
    return  allOrder 
};

const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id }
  });
};

const updateOrder = async (id: string, data: Partial<Order>) => {
  return prisma.order.update({
    where: { id },
    data,
  });
};

const deleteOrder = async (id: string) => {
  return prisma.order.delete({
    where: { id },
  });
};

export const orderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  getSellerOrder,
  getCustomerOrder,
  updateOrder,
  deleteOrder
};

