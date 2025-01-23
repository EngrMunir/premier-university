import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status';
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';

const loginUser = async (payload:TLoginUser)=>{
    
    // checking if the user is exist
    const isUserExists = await User.findOne({id:payload?.id});
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found!');
    }
    // check if the user is already deleted
    const isDeleted = isUserExists?.isDeleted;
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,'This user is deleted!');
    }
    // check if the user is already blocked
    const userStatus = isUserExists?.status;
    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN,'This user is blocked');
    }
    // checking if the password is correct
    const isPasswordMatched = bcrypt.compare(payload.password, isUserExists.password);
    


    // access granted: send access token refresh token


    return {};
}

export const AuthServices ={
    loginUser
};