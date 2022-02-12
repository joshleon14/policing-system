import { Request, Response } from 'express';
import { Station } from '../models/';


export const CreateStationController = async (req: Request, res: Response) => {

    // Extract data from the request body
    console.log(req.body);
    const { name, address, city, state, zip } = req.body;

    // Create Station object with submitted data.
    const station = Station.build({
        name,
        address,
        city,
        state,
        zip
    });

    try {
        // Save the object to mongodb
        station.save();
    } catch (err) {
        console.error(err.message);
        return res.status(400).send({message: err.message})
    }

    return res.status(200).send({station})
}

export const GetStationController = async (req: Request, res: Response) => {

    // Get All Stations
    const stations = await Station.find({});

    return res.status(200).send({stations});
}