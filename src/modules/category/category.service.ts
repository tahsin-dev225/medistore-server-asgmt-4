import { Category, Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const creatCategory = async (data : Omit<Category,'id' | 'createdAt' >) => {
   const result = await prisma.category.create({
    data 
   })
   return result;
}

export const CategoryService = {
  creatCategory
}