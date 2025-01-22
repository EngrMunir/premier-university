import AppError from "../../app/errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async(payload:TOfferedCourse)=>{
    const { semesterRegistration, academicFaculty, academicDepartment, course,faculty }=payload;
    // check if the semester registration id is exists!
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND,'Semester registration not found')
    }
    
    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if(!isAcademicFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND,'Academic Faculty not found')
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if(!isAcademicDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND,'Academic Department not found')
    }

    const isCourseExists = await Course.findById(course);
    if(!isCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,'Course not found')
    }

    const isFacultyExists = await Faculty.findById(faculty);
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND,'Faculty not found')
    }


    const result = await OfferedCourse.create({...payload, academicSemester});
    return result;
};

const getAllOfferedCoursesFromDB = async(query:Record<string, unknown>)=>{};

const getSingleOfferedCourseFromDB = async(id:string)=>{

};

const updateOfferedCourseIntoDB = async(id:string, payload:Partial<TOfferedCourse>)=>{};


export const OfferedCourseServices ={
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}