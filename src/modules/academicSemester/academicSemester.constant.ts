import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

export const Months:TMonths[] =['January','February','March','April','May','June','July','August','September','October','November','December'] as const;

export const AcademicSemesterName:TAcademicSemesterName[] =[
    'Autumn',
    'Summar',
    'Fall'
] as const;

export const AcademicSemesterCode :TAcademicSemesterCode[]=[
    '01',
    '02',
    '03'
] as const;