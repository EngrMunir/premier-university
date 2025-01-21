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
router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.assignFacultiesWithCourseValidationSchema) ,
CourseControllers.assignFacultiesWithCourse)
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema),
CourseControllers.updateCourse)
router.delete('/:id', CourseControllers.deleteCourse);

export const courseRotes = router;