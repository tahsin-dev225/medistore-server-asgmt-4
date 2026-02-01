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

const getSellerOrder = async (
//     {
//     page,
//     limit,
//     skip,
//     sortBy,
//     sortOrder
// }: {
//     page : number,
//     limit : number,
//     skip : number,
//     sortBy : string,
//     sortOrder : string 
// },
sellerId : string) => {
    const andConditions: OrderWhereInput[] = []


    if (sellerId) {
        andConditions.push({
            sellerId 
        })
    }

    const sellerAllOrder = await prisma.order.findMany({
    //   take : limit,
    //   skip,
        where: {
            sellerId
        },
        // orderBy : {
        //   [sortBy] : sortOrder
        // }
    });

    // const total = await prisma.order.count({
    //     where: {
    //         AND: andConditions
    //     }
    // })
    return {
        data : sellerAllOrder,
        // pagination : {
        //     total,
            // page,
            // limit,
        //     totalPage : Math.ceil(total / limit)
        // }
    };
};

const getAllOrder = async ({
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    sellerId: string | undefined,
    page : number,
    limit : number,
    skip : number,
    sortBy : string,
    sortOrder : string 
}) => {
    const andConditions: OrderWhereInput[] = []

    const allOrder = await prisma.order.findMany({
      take : limit,
      skip,
        where: {
            AND: andConditions
        },
        orderBy : {
          [sortBy] : sortOrder
        }
    });

    const total = await prisma.order.count({
        where: {
            AND: andConditions
        }
    })
    return {
        data : allOrder,
        pagination : {
            total,
            page,
            limit,
            totalPage : Math.ceil(total / limit)
        }
    };
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
  updateOrder,
  deleteOrder
};

