import User from '../models/userModel.js';

export const getInfluencers = async (req, res) => {
  try {
    const influencers = await User.find({ category: 'influencer', status: 'approved' }).select('name category address profile_photo');

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