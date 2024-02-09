import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        message: 'Forbidden - User is pending approval',
      });
    }

    if (user.status === 'disabled') {
      return res.status(403).json({
        message: 'Forbidden - User is disabled, please contact the administrator at mrizqiassh18@gmail.com',
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password mismatch",
      });
    }

    const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token: token,
      userId: user._id,
      role: user.role,
      name: user.name,
      status: user.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const getUserLog = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      userId: user.userId,
      role: user.role,
      name: user.name,
      status: user.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default login;
