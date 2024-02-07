import express from 'express';
import { getInfluencerById } from '../controllers/influencerController.js';
import { updateInfluencerData } from '../controllers/influencerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getInfluencers } from '../controllers/homeController.js'

const router = express.Router();

// Rute untuk mendapatkan data influencer pada halaman utama
router.get('/influencers', getInfluencers);

// Rute untuk mendapatkan data influencer tersendiri
router.get('/influencers/:id', verifyToken, getInfluencerById);

// Rute untuk mengupdate data influencer (memerlukan otentikasi)
router.put('/influencers/update/:id', verifyToken, updateInfluencerData);

export default router;