import User from '../models/userModel.js';

export const getInfluencers = async (req, res) => {
  try {
    const influencers = await User.find({ role: 'influencer', status: 'approved' });

    res.json({
      influencers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred',
    });
  }
};