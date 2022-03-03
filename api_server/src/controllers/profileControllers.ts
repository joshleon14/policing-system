import { Request, response, Response } from 'express';
import { Profile } from '../models';

export const CreateProfileController = async (req: Request, res: Response) => {
   
    const { user_id, phone_number, rank_id, department_id, is_supervisor } = req.body;

    //verify that user_id, rank_id, department_id is not null
    if (!user_id || !rank_id || !department_id) {
        return res.status(400).send({message: "One or more values were not provided."})
    }

    


}