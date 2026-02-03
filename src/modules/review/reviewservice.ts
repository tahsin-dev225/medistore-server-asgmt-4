import {  Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";




const createReview = async (data : Omit<Review,'id' | 'createdAt' | 'updatedAt' >) => {
   const result = await prisma.review.create({
    data 
   })
   return result;
}

const getAllReview = async () =>{
  return await prisma.review.findMany()
}

const deleteReview = async (reviewId : string) => {
  const reviewData = await prisma.review.findFirst({
    where : {
      id : reviewId
    },
    select : {
      id : true
    }
  })

  if(!reviewData){
    throw new Error("There are no review with this id.")
  }

  return await prisma.review.delete({
    where :{
      id : reviewData.id
    }
  })
}

export const reviewService = {
  createReview,
  getAllReview,
  deleteReview
}