import { IAcademicSemester } from './academicSemister.interace';
/* eslint-disable no-console */
import {Request, RequestHandler, Response } from 'express';
import { academicSemesterService } from './academicSemesterServices';
import { AcademicSemester } from './AcademicSemesterModel';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;
    // console.log(academicSemester, 'from controller=================');
    const result = await academicSemesterService.createAcademicSemesterService(
      academicSemester
    );

    if (result) {
      sendResponse(res, {
        success: true,
        message: 'successfully create semester',
        statusCode: 200,
        data: result,
      });
      // next();
    }
  }
);

const getAllSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = await AcademicSemester.find();

    if (data.length > 0) {
      sendResponse(res, {
        success: true,
        message: 'successfully get semester',
        statusCode: 200,
        data: data,
      });
      // next();
    } else {
      res.status(400).send({ status: false, message: 'Not found data' });
    }
  }
);

const getAllPaginationSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const paginationOption={
    //   page:Number( req.query.page),
    //   limit:Number(req.query.limit),
    //   sortBy:req.query.sortBy,
    //   sortOrder:req.query.sortOrder,
    // }

    //   *** system-1  ***///

    //   const finalObj:any = {}
    //       for (const key of paginationFields) {
    //         if (req.query && Object.hasOwnProperty.call(req.query, key)) {
    //           // console.log(Object.hasOwnProperty.call(obj, key));

    //           finalObj[key] = req.query[key];
    //         }
    //       }
    //       // console.log(finalObj,"form connnnnnnnn");
    //  const result1 = await academicSemesterService.GetPaginationSemesterService(finalObj)

    //   *** system-2  ***///

    const paginationOptions = pick(req.query, paginationFields);

    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
    // console.log(filters,"from controller",paginationOptions);

    const result = await academicSemesterService.GetPaginationSemesterService(
      filters,
      paginationOptions
    );
    // console.log(result);

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      message: 'successfully get semester',
      statusCode: 200,
      meta: result?.meta || null ||undefined,
      data: result.data,
    });
  }
);


const getSingleSemester =catchAsync(
  async(req:Request,res:Response)=>{
    const id = req.params.id;
    
    // console.log(req.params);
    const result = await academicSemesterService.GetSingleSemesterService(
      id
     
    );
    // console.log(result);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'successfully get semester',
      statusCode: 200,
      data: result || null ,
    })
  }
)


const UpdateSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData =req.body
    // console.log(id,updateData);

    // console.log(academicSemester, 'from controller=================');

    const result = await academicSemesterService.updateAcademicSemesterService(
      id,
      updateData
    )


      sendResponse(res, {
        success: true,
        message: 'successfully updated semester',
        statusCode: 200,
        data: result,
      });
      // next();
   
  }
);

const deleteSingleSemester =catchAsync(
  async(req:Request,res:Response)=>{
    const id = req.params.id;
    
    // console.log(req.params);
    const result = await academicSemesterService.DeleteSingleSemesterService(
      id
     
    );
    // console.log(result);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'successfully Deleted semester',
      statusCode: 200,
      data: result ||undefined || null ,
    })
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getAllPaginationSemester,
  getSingleSemester,
  UpdateSemesterController,
  deleteSingleSemester
};
