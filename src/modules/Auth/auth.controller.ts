import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async(req, res)=>{
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'User is logged in successfully',
        data:result,
    })
});

const changePassword = catchAsync(async(req, res)=>{
    
    const { ...passwordData } = req.body;

    const result = await AuthServices.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Password is updated successfully',
        data:result,
    })
})

export const AuthControllers = {
    loginUser,
    changePassword
}