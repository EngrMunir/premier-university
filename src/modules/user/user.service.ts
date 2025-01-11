import config from "../../app/config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.modal";
import { Student } from "../student/student..model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB =async(password:string, payload:TStudent)=>{

    // create a user object
    const userData:Partial<TUser> ={};

    userData.password = password || (config.default_password as string);

    // set student role
    userData.role ='student';

   
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    // set manually generated id
    userData.id= await generateStudentId(admissionSemester)

    // create a user
    const newUser = await User.create(userData);

    // create a student
    if( Object.keys(newUser).length){
        // set id, _id as user
        payload.id = newUser.id;
        payload.user = newUser._id;

        const newStudent = await Student.create(payload);
        return newStudent;

    }
};

export const UserServices ={
    createStudentIntoDB
}