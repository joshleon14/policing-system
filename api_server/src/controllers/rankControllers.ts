import { Request, Response } from 'express';
import { Rank } from '../models';

export const CreateRankController = async (req: Request, res: Response) => {
    // Get name from request body
    const { name } = req.body;

    // Verify that name is not null
    if (!name) {
        return res.status(400).send({message: "Required Field Name is not provided."})
    }

    // Verify that name is not an empty string
    if (name === '') {
        return res.status(400).send({message: "Name of rank can not be empty."})
    }

    const newRank = Rank.build({
        name
    });

    try {
        newRank.save()
    } catch (err) {
        console.error("Failed to save rank")
        return res.status(400).send({message: err.message})
    }

    return res.status(201).send(newRank)



};

export const GetRankController = async (req: Request, res: Response) => {
    const ranks = await Rank.find({});

    return res.status(200).send(ranks)

};