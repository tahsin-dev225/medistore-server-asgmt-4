import { NextFunction, Request, Response } from "express";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { userRole } from "../../middlewere/auth";
import { userService } from "./user.service";




const getAllUser = async (req: Request, res: Response) => {
    try {

      const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await userService.getAllUsers({ page, limit, skip })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get Users data.",
          details: e
      })
    }
}

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getUserById(
      req.params.userId as string
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response,next: NextFunction,) => {
  try {
    const result = await userService.updateUser(
      req.params.userId as string,
      req.body,
    );
    res.status(200).json({
      success : true,
      message : "User updated successtully.",
      data : result
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async ( req: Request,res: Response,next: NextFunction,) => {
  try {
    const { userId } = req.params;

    const user = req.user;
      
      if(!user){
        return res.status(401).json({
          error  : "Unothorized!"
        })
      }

      if(user.role === userRole.ADMIN){
        await userService.deleteUser(userId as string);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
      }

  } catch (error) {
    next(error);
  }
};


export const orderControlle = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
}