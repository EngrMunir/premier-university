import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';


const router = express.Router();

router.post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourses,
);


router.get('/',CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema) ,
CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties', 
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema) ,
CourseControllers.removeFacultiesFromCourse)
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema),
CourseControllers.updateCourse)
router.delete('/:id', CourseControllers.deleteCourse);

export const courseRoutes = router;