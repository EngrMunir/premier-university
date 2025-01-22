
import express from 'express';
import { OfferedCourseControllers } from './OfferdCourse.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';


const router = express.Router();

router.get('/',OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
);

router.patch('/:id',
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
)

export const offeredCourseRoutes = router;