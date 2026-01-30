import { prisma } from "../lib/prisma";
import { userRole } from "../middlewere/auth";

async function seeedAdmin() {
  try {
    const adminData = {
      name : "admin tasinn",
      email : "ahmedtasin225@gmail.com",
      role : userRole.ADMIN,
      password : "asdfasdf",
      emailVerified : true
    }

    const existingUser = await prisma.user.findUnique({
      where : {
        email : adminData.email
      }
    })

    if(existingUser) {
      throw new Error("User already exists!")
    }

    const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(adminData)
    })

     console.log(signUpAdmin);


     if(signUpAdmin.ok){
      await prisma.user.update({
        where : {
          email : adminData.email
        },
        data : {
          emailVerified : true
        }
      })
     }

  } catch (error) {
    console.error(error);
  }
}

seeedAdmin()