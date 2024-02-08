import express from 'express';
import { getInfluencers } from '../controllers/homeController.js';

const router = express.Router();

router.get('/home', getInfluencers);

export default router;