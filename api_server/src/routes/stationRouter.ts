import express from 'express';
import * as StationControllers from '../controllers';

const router = express.Router();

// route to get station information
router.get("/", StationControllers.GetStationController);


// route to create a new station
router.post("/create", StationControllers.CreateStationController);


export default router;