import QueryBuilder from "../../app/builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseIntoDB = async(payload:TCourse)=>{
    const result = await Course.create(payload);
    return result;
};

const getAllCoursesFromDB = async (query:Record<string, unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDB = async (id:string) =>{
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const updateCourseIntoDB = async (id:string, payload:Partial<TCourse>)=>{
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    // step-1 basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new:true,
            runValidators:true
        }
    )

    return updatedBasicCourseInfo
}

const deleteCourseFromDB = async(id:string, )=>{
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true},
        { new: true}
    );
    return result;
};

export const CourseServices ={
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
}