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

        return lastStudent?.id? lastStudent.id.substring(6) : undefined
    }

    // first time 0000
    const currentId = await findLastStudentId() || (0).toString();
    let incrementId = (Number(currentId) +1).toString().padStart(4,'0');
    const year = payload.year.slice(0, 4);
    const code = payload.code;

    incrementId = `${year}${code}${incrementId}`;

    return incrementId;
}
