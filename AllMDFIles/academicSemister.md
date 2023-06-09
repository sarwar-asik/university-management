### AcademicSemester

### src>app>modules>AcademicSemester>AcademicSemester>AcademicSemester.interface :::

            import { Model } from 'mongoose';

        export type Month = [ 'January' | 'February' | 'March' | 'April'| 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'];

        export type IAcademicSemester = {
        title: 'Autumn' | 'Summer' | 'Fall';
        year: number;
        code: '01' | '02' | '03';
        startMonth: Month;
        endMonth: Month;
        };

        export type AcademicSemesterModel = Model<IAcademicSemester>;

### src>app>modules>AcademicSemester>AcademicSemester.model.ts :::

        import { Schema, model } from 'mongoose';
        import {
        AcademicSemesterModel,
        IAcademicSemester,
        Month,
        } from './academicSemister.interace';
        const months: Month[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        ];

        const AcademicSemesterSchema = new Schema<IAcademicSemester>(
        {
            title: {
            type: String,
            required: true,
            enum: ['Autumn', 'Summer', 'Fall'],
            },
            year: {
            type: Number,
            required: true,
            },
            code: {
            type: String,
            required: true,
            enum: ['01', '02', '03'],
            },
            startMonth: {
            type: String,
            required: true,
            enum: months,
            },
            endMonth: {
            type: String,
            required: true,
            enum: months,
            },
        },
        { timestamps: true }
        );

        export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
        'AcademicSemester',
        AcademicSemesterSchema
        );

### src>app>modules>AcademicSemester>AcademicSemester.routes :::

### src>app>modules>AcademicSemester>AcademicSemester.validation :::

                import { z } from "zod"

            const createUserAcademicSemesterSchema = z.object({
                body: z.object({
                title: z.enum(['Autumn', 'Summer', 'Fall'],{
                    required_error:"Title is required"
                }),
                year:z.number({
                    required_error:"Year is required"
                }),
                code :z.enum( ['01', '02', '03'],{
                    required_error:"Code is required"
                }),
                startMonth:z.enum( [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],{
                    required_error:"Start month is required"
                }),
                endMonth:z.enum( [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],{
                    required_error:"Start month is required"
                })

                }),
            })

            export const UserValidation = {
                createUserAcademicSemesterSchema
            }

### Check duplicate semester in same month and year( USE BEFORE MODEL DECLARE IN model.ts) ::::
              use after schemas >>>>>
    
    AcademicSemesterSchema.pre('save', async function (next) {
        const isExists = await AcademicSemester.findOne({
            title: this.title,
            year: this.year,
        });
        if (isExists) {
            throw new ApiError(status.CONFLICT, 'Already exists the semester');
        }
        next();
    });

### CHeck valid status code before create in modules>academicSemester>academicSemesterServices ::::::

        export const academicSemesterTittleCodeMapper:{
            [key:string]:string
        } = { 
            Autumn:"01",
            Summer:"02",
            Fall:"03"
        }

        /////  use in the function >>>>

        const createAcademicSemesterService = async (payload: IAcademicSemester
        ): Promise<IAcademicSemester> => {

        if (academicSemesterTittleCodeMapper[payload.title] !== payload.code) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
        }

        const result = await AcademicSemester.create(payload);
        return result;
        };
