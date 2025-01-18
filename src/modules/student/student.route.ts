import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../app/middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
    '/:studentId',
    validateRequest(updateStudentValidationSchema), 
    StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;