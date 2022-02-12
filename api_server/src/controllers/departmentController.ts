import { Request, Response } from 'express';
import { Department } from '../models/';


export const GetDepartmentsController = async (req: Request, res: Response) => {

    // get list of departments
    const departments = await Department.find({});
    return res.status(200).send(departments);
}

export const CreateDepartmentController = async (req: Request, res: Response) => {
    return "hello"
}