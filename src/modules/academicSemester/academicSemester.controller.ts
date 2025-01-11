
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
 )
export const AcademicSemesterControllers = {
    createAcademicSemester,
}