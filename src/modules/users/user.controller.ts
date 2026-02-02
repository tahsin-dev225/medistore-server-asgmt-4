import { NextFunction, Request, Response } from "express";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { userRole } from "../../middlewere/auth";
import { userService } from "./user.service";




const getAllUser = async (req: Request, res: Response) => {
    try {
      // const {page,limit, skip,sortBy, sortOrder} = paginationSortingHelper(req.query)

      const result = await userService.getAllUsers()
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({
          error: "Couldn't get Users data.",
          details: e
      })
    }
}

const getUserById = async (req: Request,res: Response,next: NextFunction,) => {
  try {
    const result = await userService.getUserById(
      req.params.userId as string
    );
    res.status(200).json(result);
  } catch  (e) {
      res.status(400).json({
          error: "Couldn't get User data.",
          details: e
      })
  }
};

export const updateMyProfile = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const userId = req.user!.id;
    if(userId !== req.params.userId){
      return res.status(400).json({
        message : 'Unauthorized!'
      })
    }
    const { name, image } = req.body;

    const result = await userService.updateProfile(userId, {
      name,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (e) {
      res.status(400).json({
          error: "Couldn't update Users data.",
          details: e
      })
  }
};

export const adminUpdateUser = async (req: Request,res: Response,next: NextFunction ) => {
  try {
    const { status, isBanned } = req.body;

    const result = await userService.adminUpdateUserStatus(req.params.userId as string, { status, isBanned });

    res.status(200).json({
      success: true,
      message: "User status updated",
      data: result,
    });
  } catch (e) {
      res.status(400).json({
          error: "Couldn't update Users status.",
          details: e
      })
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

  } catch (e) {
      res.status(400).json({
          error: "Couldn't delete User.",
          details: e
      })
  }
};


export const UserController = {
  getAllUser,
  getUserById,
  updateMyProfile,
  adminUpdateUser,
  deleteUser
}