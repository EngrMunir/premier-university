import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { catchAsync } from "../../app/utils/catchAsync";


const getAllStudents = catchAsync(async (req, res) =>{
   
        const result = await StudentServices.getAllStudentsFromDB(req.query)

        sendResponse(res, {
            statusCode:httpStatus.OK,
            success:true,
            message:'Students are retrieved successfully',
            data:result
        })
})

const getSingleStudent = catchAsync( async (req, res) =>{
        const { id } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(id)

        res.status(200).json({
            success:true,
            message:'Students is retrieved successfully',
            data:result,
        })
})
const updateStudent = catchAsync(async (req, res) =>{
    
        const { id } = req.params;
        const { student } = req.body;
        const result = await StudentServices.updateStudentIntoDB(id, student)

        res.status(200).json({
            success:true,
            message:'Student is updated successfully',
            data:result,
        })    
})
const deleteStudent = catchAsync(async (req, res) =>{
    
        const { id } = req.params;
        const result = await StudentServices.deleteStudentFromDB(id)

        res.status(200).json({
            success:true,
            message:'Students is deleted successfully',
            data:result,
        })
    
})

export const StudentControllers ={
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
}