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
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export default login;
