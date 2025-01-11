
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { catchAsync } from "../../app/utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";



const createAcademicSemester =catchAsync(async(req, res)=>{
    
    //  const {password, student: studentData } = req.body;
     const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
     sendResponse(res, {
         statusCode:httpStatus.OK,
         success:true,
         message:'Academic semester is created successfully',
         data:result
     })
    }
 );

 const getAllAcademicSemesters = catchAsync( async (req, res)=>{

    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic semester is retrived successfully',
        data:result,
    })
 })
 const getSingleAcademicSemester = catchAsync( async (req, res)=>{
    const { semesterId} = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic semester is retrived successfully',
        data:result,
    })
 })

 const updateAcademicSemester = catchAsync(async(req , res)=>{
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
        semesterId,
        req.body,
    );

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic semester is retrived succesfully',
        data:result
    })
 })

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
}