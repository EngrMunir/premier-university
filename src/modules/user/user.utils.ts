import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

 // year semester 4 digit number  
export const generateStudentId = async(payload:TAcademicSemester)=>{


    const findLastStudentId = async ()=>{
        const lastStudent = await User.findOne({
            role:'student'
        },{
            id:1,
            _id:0
        })
        .sort({
            createdAt:-1
        })
        .lean()

        return lastStudent?.id? lastStudent.id : undefined
    }

    // first time 0000
    let currentId = (0).toString(); //0000
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId?.substring(4,6); //01
    const lastStudentYear = lastStudentId?.substring(0,4); //2030

    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
        currentId = lastStudentId.substring(6) //0001
    }
    let incrementId = (Number(currentId) +1).toString().padStart(4,'0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;
}
