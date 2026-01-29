import { NextFunction, Request, Response } from "express";
import {  reviewService } from "./reviewservice";


const createReview = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const {medicineId, customerId, content} = req.body
    const user = req.user;
    if(!user){
      return res.status(401).json({
        error  : "Unothorized!, No user"
      })
    }
    const result = await reviewService.createReview({content,customerId,medicineId})
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


const getAllReview = async (req : Request, res : Response) =>{
    try {

      const result = await reviewService.getAllReview();
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({
        error : "Couldn't get category data.",
        details : error
      })
    }
}


const deleteReview = async (req : Request, res : Response) =>{
    try {
      const {categoryId} = req.params;

      const result = await reviewService.deleteReview(categoryId as string);
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({
        error : "Category delete failed",
        details : error
      })
    }
}


export const reviewController = {
  createReview,
  getAllReview,
  deleteReview
}