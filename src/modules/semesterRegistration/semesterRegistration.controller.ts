import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
    async(req:Request, res:Response) =>{
        const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success:true,
            message:'Semester Registration is created successfully',
            data:result,
        })

    }
);

const getAllSemesterRegistrations = catchAsync(
    async(req: Request, res:Response) =>{

        const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success:true,
            message:'Semester Registrations are retrieved successfully',
            data:result,
        })

    }
);

const getSingleSemesterRegistration = catchAsync(
    async(req:Request, res:Response) =>{
        const { id } = req.params;

        const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success:true,
            message:'Semester Registration is retrieved successfully',
            data:result,
        })
    }
);

const updateSemesterRegistration =catchAsync(
    async(req:Request, res:Response) =>{

        const {id} = req.params;
        const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Semester Registration is updated successfully',
            data:result,
        })
    }
);

export const SemesterRegistrationController ={
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getAllSemesterRegistrations,
    updateSemesterRegistration
}