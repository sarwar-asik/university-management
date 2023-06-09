/* eslint-disable no-console */
import {  Request, Response } from 'express';

import { User } from './user.model';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {

  const {student,...userData}= req.body;

  console.log('Cookie',req.cookies);

  

  // console.log(user, 'from controller=================');
 
  const result = await UserService.createStudentServices(student,userData);


    sendResponse(res, {
      success: true,
      message: 'successfully create User',
      statusCode: httpStatus.CREATED,
      data: result,
    });


});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const data = await User.find();
  sendResponse(res, {
    success: true,
    message: 'successfully user login',
    statusCode: httpStatus.FOUND,
    data: data,
  });
});

export const userController = { createUser: createStudent, getUser };