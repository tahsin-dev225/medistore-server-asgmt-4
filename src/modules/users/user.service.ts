import {  User } from "../../../generated/prisma/client";
import {  UserUpdateInput, UserWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const getAllUsers = async () => {
    const andConditions: UserWhereInput[] = []

    const allUser = await prisma.user.findMany();

    return  allUser
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

export const updateProfile = async (
  userId: string,
  data: Pick<UserUpdateInput, "name" | "image">
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const adminUpdateUserStatus = async (
  userId: string,
  data: Pick<UserUpdateInput, "status" | "isBanned">
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const userService = {
  getAllUsers,
  getUserById,
  updateProfile,
  adminUpdateUserStatus,
  deleteUser,

};

