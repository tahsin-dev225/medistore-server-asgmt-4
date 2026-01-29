import { NextFunction, Request, Response } from "express";
import {  orderService } from "./order.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { Order } from "../../../generated/prisma/client";
import { userRole } from "../../middlewere/auth";

const createOrder = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const customerId = req.user?.id ;
    const {title, medicineId, sellerId, quantity, totalPrice}  = req.body;
    if( !customerId){
      return res.status(401).json({
        error  : "Unothorized!"
      })
    }

    const result = await orderService.createOrder({title , medicineId,customerId, sellerId, quantity, totalPrice})
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


const getSellerOrder = async (req: Request, res: Response) => {
    try {

      // const {sellerId} = req.params;
      const user = req.user;
      
      if(!user || user.role !== "SELLER"){
        return res.status(401).json({
          error  : "Unothorized!, You are not seller."
        })
      }

      // const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await orderService.getSellerOrder(
        // { page, limit, skip,sortBy,sortOrder },
        user.id as string)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get medicine data.",
          details: e
      })
    }
}

const getAllOrder = async (req: Request, res: Response) => {
    try {
      

      const sellerId = req.query.authorId as string | undefined

      const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await orderService.getAllOrder({ sellerId, page, limit, skip,sortBy,sortOrder })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get medicine data.",
          details: e
      })
    }
}

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.getOrderById(
      req.params.orderId as string
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req: Request, res: Response,next: NextFunction,) => {
  try {
    const result = await orderService.updateOrder(
      req.params.id as string,
      req.body,
    );
    res.status(200).json({
      success : true,
      message : "Order updated successtully.",
      data : result
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async ( req: Request,res: Response,next: NextFunction,) => {
  try {
    const { id } = req.params;

    const user = req.user;
      
      if(!user){
        return res.status(401).json({
          error  : "Unothorized!, You are not admin or currect seller."
        })
      }

      if(user.role === userRole.ADMIN){
        await orderService.deleteOrder(id as string);
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
      }

  } catch (error) {
    next(error);
  }
};


export const orderControlle = {
  createOrder,
  getSellerOrder,
  getAllOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
}