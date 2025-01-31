import { Router } from "express";
import { UserRoutes } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";
import { AcademicSemesterRoutes } from "../../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDepartment/academicDepartment.route";
import { courseRoutes } from "../../modules/Course/course.route";
import { SemesterRegistrationRoutes } from "../../modules/semesterRegistration/semesterRegistration.route";
import { AuthRoutes } from "../../modules/Auth/auth.route";

const router = Router();

const moduleRoutes =[
    {
        path:'/users',
        route:UserRoutes
    },
    {
        path:'/students',
        route:StudentRoutes
    },
    {
        path:'/academic-semesters',
        route:AcademicSemesterRoutes,
    }
    ,
    {
        path:'/academic-faculties',
        route:AcademicFacultyRoutes,
    },
    {
        path:'/academic-departments',
        route:AcademicDepartmentRoutes
    },
    {
        path:'/courses',
        route:courseRoutes,
    },
    {
        path:'/semester-registrations',
        route:SemesterRegistrationRoutes
    },
    {
        path:'/auth',
        route:AuthRoutes,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;