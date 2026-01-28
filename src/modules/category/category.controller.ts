import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";


const createCategory = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const user = req.user;
    if(!user){
      return res.status(401).json({
        error  : "Unothorized!, No user"
      })
    }
    const result = await CategoryService.creatCategory(req.body)
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


const getAllCategory = async (req : Request, res : Response) =>{
    try {

      const result = await CategoryService.getAllCategory();
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({
        error : "Couldn't get category data.",
        details : error
      })
    }
}


const deleteCategory = async (req : Request, res : Response) =>{
    try {
      const {categoryId} = req.params;

      const result = await CategoryService.deleteCategory(categoryId as string);
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({
        error : "Category delete failed",
        details : error
      })
    }
}


export const categoryController = {
  createCategory,
  getAllCategory,
  deleteCategory
}