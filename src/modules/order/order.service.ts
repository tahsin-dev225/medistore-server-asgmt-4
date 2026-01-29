import { Order } from "../../../generated/prisma/client";
import {  OrderWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createOrder = async (data :Omit< Order, 'id' | 'createdAt' | 'status' | 'updatedAt'>) => {
   const result = await prisma.order.create({
    data 
   })
   return result;
}

const getSellerOrder = async ({
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    page : number,
    limit : number,
    skip : number,
    sortBy : string,
    sortOrder : string 
},sellerId : string) => {
    const andConditions: OrderWhereInput[] = []


    if (sellerId) {
        andConditions.push({
            sellerId 
        })
    }

    const sellerAllOrder = await prisma.order.findMany({
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
        data : sellerAllOrder,
        pagination : {
            total,
            page,
            limit,
            totalPage : Math.ceil(total / limit)
        }
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

