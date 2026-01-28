import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const creatCategory = async (data : Omit<Category,'id' | 'createdAt' >) => {
   const result = await prisma.category.create({
    data 
   })
   return result;
}


const getAllCategory = async () =>{
  return await prisma.category.findMany()
}

const deleteCategory = async (categoryId : string) => {
  const categoryData = await prisma.category.findFirst({
    where : {
      id : categoryId
    },
    select : {
      id : true
    }
  })

  if(!categoryData){
    throw new Error("There are no category with this id.")
  }

  return await prisma.category.delete({
    where :{
      id : categoryData.id
    }
  })
}

export const CategoryService = {
  creatCategory,
  getAllCategory,
  deleteCategory
}