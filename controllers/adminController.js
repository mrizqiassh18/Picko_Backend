import User from "../models/userModel.js";

export const getInfluencers = async (req, res, next) => {
  try {
    const getInfluencers = await User.find({ role: "influencer" });
    res.json({
      success: true,
      getInfluencers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export const approveInfluencer = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const influencer = await User.findById(influencerId);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    influencer.status = "approved";
    await influencer.save();

    res.json({
      success: true,
      message: "Influencer approved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export const disableInfluencer = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const influencer = await User.findById(influencerId);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    influencer.status = "disabled";
    await influencer.save();

    res.json({
      success: true,
      message: "Influencer disabled successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export const getInfluencersCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "influencer" });
    res.json({ count });
  } catch (error) {
    console.error("Error getting influencers count:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
