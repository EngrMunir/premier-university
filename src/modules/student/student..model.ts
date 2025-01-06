import { model, Schema } from "mongoose";
import validator from 'validator';
import { 
    StudentModel,
    TGuardian, 
    TLocalGuardian, 
    TStudent, 
    TUserName 
} from "./student.interface";
import bcrypt from 'bcrypt'
import config from "../../app/config";

const userNameSchema = new Schema<TUserName>({
        firstName:{
            type:String,
            required:[true,'First name is required'],
            trim:true,
            maxlength:[20, 'First Name can not be more than 20 character'],
            validate: {
                validator: function(value: string){
                    const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                    return firstNameStr === value;
                },
                message:`{VALUE} is not in capitalize format`
            }
        },
        middleName:{
            type:String,
        },
        lastName:{
            type:String,
            required:[true,'Last name is required'],
            validate:{
                validator: (value:string)=> validator.isAlpha(value),
                message:`{VALUE} is not valid`,
            }
        },
})

const guardianSchema = new Schema<TGuardian>(
    {
        fatherName:{
            type:String,
            required:[true,'Father name is required'],
        },
        fatherOccupation:{
            type:String,
            required:[true,'Father occupation is required']
        },
        fatherContactNo:{
            type:String,
            required:[true,'Father contact no is required'],
        },
        motherName:{
            type:String,
            required:[true,'Mother name is required'],
        },
        motherOccupation:{
            type:String,
            required:[true,'Mother occupation is required']
        },
        motherContactNo:{
            type:String,
            required:[true,'Mother contact no is required'],
        },
    }
)

const localGuardianSchema = new Schema<TLocalGuardian>(
    {
        name:{
            type:String,
            required:[true,'Local guardian name is required'],
        },
        occupation:{
            type:String,
            required:[true,'Local guardian occupation is required'],
        },
        contactNo:{
            type:String,
            required:[true,'Local guardian contact name is required'],
        },
        address:{
            type:String,
            required:[true,'Local guardian address is required'],
        }
    }
)

const studentSchema = new Schema<TStudent,StudentModel>({
    id:{ type:String, required:true, unique:true },
    password:{ type:String, required:[true, 'Password is required'],
          maxlength:[20,'password can not be more than 20 characters']},
    name:{
        type:userNameSchema,
        required:[true,'name is required'],
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not required`
        },
        required:true
    },
    dateOfBirth:{ type: String },
    email: { 
        type: String, 
        required:[true,'Email is required'], 
        unique:true,
        // validate:{
        //     validator:(value:string) => validator.isEmail(value),
        //     message:`{VALUE} is not a valid email type`
        // } 
    },
    contactNo:{ type:String, required:[true,'ContactNo is required']},
    emergencyContactNo:{ type:String, required:[true,'Emergency ContactNo is required']},
    bloodGroup:{
        type:String,
        enum:['A+','A-','B+','B-','AB+','AB-','O+','O-'],
    },
    presentAddress:{ type:String, required:[true,'Present Address is required']},
    permanentAddress:{ type:String, required:[true,'Permanent address is required']},
    guardian:{
        type:guardianSchema,
        required:[true,'Guardian is required']
    },
    localGuardian:{
        type:localGuardianSchema,
        required:[true,'Local guardian is required']
    },
    profileImg:{ type: String },
    isActive:{
        type:String,
        enum:['active','blocked'],
        default:'active',
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

// pre save middleware / hook
studentSchema.pre('save', async function(next){
    // console.log(this,'pre hook: before save the data')

    // hashing password and save into DB
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password =await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
})

// post save middleware /hook
studentSchema.post('save', function(doc, next){
    doc.password='';
    next()
})

// query middleware
studentSchema.pre('find', function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})
studentSchema.pre('findOne', function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})
// aggregate middleware
// [{$match}:{isDeleted:{$ne:true}}},{'$match':{id:'1234'}}]
studentSchema.pre('aggregate', function(next){
    // console.log(this.pipeline());
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
    next();
})





// creating a custom static method
studentSchema.statics.isUserExists = async function(id:string){
    const existingUser = await Student.findOne({id});

    return existingUser;
}

// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id:string){
//     const existingUser = await Student.findOne({id})
//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);