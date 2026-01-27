import { NextFunction, Request, Response } from "express"
import { Prisma } from "../../generated/prisma/client";

function errorHandler (
  err : any, 
  req : Request, 
  res : Response, 
  next : NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error.";
  let errorDetails = err;

  // PrismaClientValidationError
  if(err instanceof Prisma.PrismaClientValidationError){
    statusCode = 400;
    errorMessage = "You provide incorrect feild type or missing feilds.";
  }
  // PrismaClientKnownRequestError
  else if(err instanceof Prisma.PrismaClientKnownRequestError){
    if(err.code === "p2025"){
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}"
    }
    else if(err.code === "p2002"){
      statusCode = 400;
      errorMessage = "Duplicate key error"
    }
    else if(err.code === "p2003"){
      statusCode = 400;
      errorMessage = "Forein key constraint failed"
    }
  }
  // PrismaClientUnKnownRequestError
  else if(err instanceof Prisma.PrismaClientUnknownRequestError){
    statusCode = 500;
    errorMessage = "Error occurred during query execution."
  }
  // PrismaClientRustPanicError
  else if(err instanceof Prisma.PrismaClientRustPanicError){
    statusCode = 500;
    errorMessage = " Underlying Prisma engine crashed"
  }
  // PrismaClientInitializationError
  else if(err instanceof Prisma.PrismaClientInitializationError){
    if(err.errorCode === "p1000"){
      statusCode = 401;
      errorMessage = "Authentication failed. please check your credentials."
    }
    else if(err.errorCode === "p1001"){
      statusCode = 400;
      errorMessage = "Can't reach database server."
    }
  }

  res.status(statusCode)
  res.json({ 
    message : errorMessage ,
    error : errorDetails
  })
}

export default errorHandler;