import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";

const createSemesterRegistration = catchAsync(
    async(req:Request, res:Response) =>{

    }
);

const getAllSemesterRegistrations = catchAsync(
    async(req: Request, res:Response) =>{

    }
);

const getSingleSemesterRegistration = catchAsync(
    async(req:Request, res:Response) =>{
        const { id } = req.params;
    }
);

const updateSemesterRegistration =catchAsync(
    async(req:Request, res:Response) =>{

    }
);

export const SemesterRegistrationController ={
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getAllSemesterRegistrations,
    updateSemesterRegistration
}