import { Schema, model } from 'mongoose';
import {
  FacultyModel, IAcademicFaculty,

} from '../academicFaculty/acdemicFaculty.interface';

const FacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
  },
  
  {timestamps: true ,
  toJSON:{
    virtuals:true
  }}
);

export const Faculty = model<IAcademicFaculty, FacultyModel>('AcademicFaculty', FacultySchema);
