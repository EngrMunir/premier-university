import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { OfferedCourseServices } from "./OfferedCourse.service";


const createOfferedCourse = catchAsync(async (req:Request, res:Response)=>{

    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Offered course is created successfully',
        data:result
    })
})

const getAllOfferedCourses = catchAsync( async (req:Request, res:Response)=>{

})

const getSingleOfferedCourse = catchAsync(async (req:Request, res:Response)=>{

})

const updateOfferedCourse = catchAsync(async(req:Request, res:Response)=>{})

export const OfferedCourseControllers ={
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse
}