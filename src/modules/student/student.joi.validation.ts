import Joi from "joi";

 // creating a schema validation using joi
    const userNameValidationSchema = Joi.object({
        firstName: Joi.string()
          .trim()
          .max(20)
          .required()
          .regex(/^[A-Z][a-z]*$/)
          .message('{#label} must be in capitalized format'),
        middleName: Joi.string().allow(null, ''),
        lastName: Joi.string()
          .required()
          .regex(/^[a-zA-Z]+$/)
          .message('{#label} must contain only alphabetic characters'),
      });
      
      const guardianValidationSchema = Joi.object({
        fatherName: Joi.string().required(),
        fatherOccupation: Joi.string().required(),
        fatherContactNo: Joi.string().required(),
        motherName: Joi.string().required(),
        motherOccupation: Joi.string().required(),
        motherContactNo: Joi.string().required(),
      });
      
      const localGuardianValidationSchema = Joi.object({
        name: Joi.string().required(),
        occupation: Joi.string().required(),
        contactNo: Joi.string().required(),
        address: Joi.string().required(),
      });
      
      const studentValidationSchema = Joi.object({
        id: Joi.string().required(),
        name: userNameValidationSchema.required(),
        gender: Joi.string()
          .valid('male', 'female', 'other')
          .required()
          .messages({ 'any.only': '{#label} must be one of [male, female, other]' }),
        dateOfBirth: Joi.string(),
        email: Joi.string().email().required(),
        contactNo: Joi.string().required(),
        emergencyContactNo: Joi.string().required(),
        bloodGroup: Joi.string()
          .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
          .messages({ 'any.only': '{#label} must be a valid blood group' }),
        presentAddress: Joi.string().required(),
        permanentAddress: Joi.string().required(),
        guardian: guardianValidationSchema.required(),
        localGuardian: localGuardianValidationSchema.required(),
        profileImg: Joi.string().uri(),
        isActive: Joi.string()
          .valid('active', 'blocked')
          .default('active')
          .messages({ 'any.only': '{#label} must be either active or blocked' }),
      });

      export default studentValidationSchema