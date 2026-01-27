import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicine.service";

const createMedicine = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    // const user = req.user;
    // if(!user){
    //   return res.status(401).json({
    //     error  : "Unothorized!, No user"
    //   })
    // }
    const result = await MedicineService.creatMedicine(req.body, 'selleride123')
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


export const MedicineControlle = {
  createMedicine
}