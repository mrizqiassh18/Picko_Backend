import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/userModel.js";

export const verifyToken = (req, res, next) => {
  try {
    // Pastikan header Authorization ada dalam permintaan HTTP
    if (!req.headers.authorization) {
      throw new Error("Authorization header not found");
    }

    const token = req.headers.authorization.split(" ")[1];

    // Melakukan verifikasi token
    jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        throw new Error("Invalid token");
      }

      // Menyimpan ID pengguna dalam request
      req.userId = decoded.userId;

      // Mendapatkan pengguna berdasarkan ID
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized - Invalid user",
        });
      }

      // Melanjutkan ke middleware berikutnya jika semuanya valid
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: `Unauthorized - ${error.message}`,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Mendapatkan pengguna berdasarkan ID yang disetel oleh middleware verifyToken
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden - Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
