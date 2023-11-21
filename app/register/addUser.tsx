import prisma from "@/prisma/client";
import bcrypt from "bcrypt"
import { RefObject } from "react";
import { User } from "../services/users";

export default async function addUser(password : RefObject<HTMLInputElement>, newPerson : User){
    const hashedPassword = await bcrypt.hash(password.current!.value,10);
    prisma.user.create({
        data:{
            age: newPerson.age,
            bus_number : newPerson.bus_number,
            email : newPerson.email,
            firstName : newPerson.firstName,
            lastName : newPerson.lastName,
            number_of_years_in_atl : newPerson.number_of_years_in_atl,
            password : hashedPassword,
            user_type : newPerson.user_type,
            class : newPerson.class,
            phonenumber : newPerson.phonenumber,
            section : newPerson.section
        }
    })
}