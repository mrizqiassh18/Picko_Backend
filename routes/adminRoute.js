import express from 'express';
import { getInfluencers, approveInfluencer, disableInfluencer } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { getInfluencersCount } from '../controllers/adminController.js';

const router = express.Router();

// Rute untuk mendapatkan influencer yang masih pending
router.get('/admin/influencers', verifyToken, isAdmin, getInfluencers);

// Rute untuk menyetujui influencer
router.put('/admin/approve-influencer/:id', verifyToken, isAdmin, approveInfluencer);

// Rute untuk menonaktifkan (disable) influencer
router.put('/admin/disable-influencer/:id', verifyToken, isAdmin, disableInfluencer);

router.get('/admin/influencers-count', verifyToken, isAdmin, getInfluencersCount);

export default router;
