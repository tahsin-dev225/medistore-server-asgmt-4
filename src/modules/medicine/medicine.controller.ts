import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicine.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createMedicine = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const user = req.user;
    console.log('create medicine',req.body);
    console.log('create medicine',req.user);
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


const getSellerMedicines = async (req: Request, res: Response) => {
    try {
      // const { search } = req.query
      // const searchString = typeof search === 'string' ? search : undefined

      // const {sellerId} = req.params;
      const user = req.user;
      
      if(!user || user.role !== "SELLER"){
        return res.status(401).json({
          error  : "Unothorized!, You are not seller."
        })
      }
      const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await MedicineService.getSellerMedicines(
        // { page, limit, skip,sortBy,sortOrder },
        user?.id as string)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get medicine data.",
          details: e
      })
    }
}

const getManageAllMedicines = async (req: Request, res: Response) => {
    try {
      const result = await MedicineService.getManageAllMedicines()
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get medicine data.",
          details: e
      })
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

const getMedicineId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicineService.getMedicineById(
      req.params.medicineId as string
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicineService.updateMedicine(
      req.params.id as string,
      req.body,
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMedicine = async ( req: Request,res: Response,next: NextFunction,) => {
  try {
    const { id } = req.params;

    await MedicineService.deleteMedicine(id as string);

    return res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const MedicineControlle = {
  createMedicine,
  getSellerMedicines,
  getAllMedicines,
  getManageAllMedicines,
  getMedicineId,
  deleteMedicine,
  updateMedicine,
}