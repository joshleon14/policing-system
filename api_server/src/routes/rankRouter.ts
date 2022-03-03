import express from 'express';
import * as RankControllers from '../controllers';

// Create Rank Router
const router = express.Router()

// Get Ranks Route
router.get('/', RankControllers.GetRankController);

// Create Rank Route
router.post('/create', RankControllers.CreateRankController);


export default router;