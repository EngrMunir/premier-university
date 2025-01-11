import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

 const validateRequest = (schema:AnyZodObject)=>{

    return async(req:Request, res:Response, next:NextFunction)=>{
        console.log(`my name ${name}`);
        try {
            // validation
        // if everything allright next()
         await schema.parseAsync({
            body:req.body
        })
        } catch (err) {
            next(err);
        }
    
        next()
    }
    }

    export default validateRequest;