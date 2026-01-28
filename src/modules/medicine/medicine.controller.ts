import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicine.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createMedicine = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const user = req.user;
    console.log('user',user);
    if(!user){
      return res.status(401).json({
        error  : "Unothorized!, No user"
      })
    }
    const result = await MedicineService.createMedicine(req.body, user.id)
    res.status(201).json(result)
  }catch (e) {
    next(e)
  }
}


const getAllMedicines = async (req: Request, res: Response) => {
    try {
      const { search } = req.query
      const searchString = typeof search === 'string' ? search : undefined

      const sellerId = req.query.authorId as string | undefined

      const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await MedicineService.getAllMedicines({ search: searchString, sellerId, page, limit, skip,sortBy,sortOrder })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get medicine data.",
          details: e
      })
    }
}

export const MedicineControlle = {
  createMedicine,
  getAllMedicines
}