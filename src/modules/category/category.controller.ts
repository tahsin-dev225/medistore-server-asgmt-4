import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    // const user = req.user;
    // if(!user){
    //   return res.status(401).json({
    //     error  : "Unothorized!, No user"
    //   })
    // }
    const result = await CategoryService.creatCategory(req.body)
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


export const categoryController = {
  createCategory
}