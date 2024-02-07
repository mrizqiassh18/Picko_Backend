import User from "../models/userModel.js";
import upload from "../middleware/cloudinaryMiddleware.js"; // Import middleware Multer dan Cloudinary
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";

export const getInfluencerById = async (req, res) => {
  try {
    const influencerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(influencerId)) {
      // Jika tidak valid, kirimkan respons dengan status 400 dan pesan kesalahan
      return res.status(400).json({ message: 'Invalid influencer ID' });
    }

    const influencer = await User.findOne({
      _id: influencerId,
      role: "influencer",
      status: "approved",
    });

    if (!influencer) {
      return res.status(404).json({
        message: "Influencer not found",
      });
    }

    res.json({
      influencer,  // Use 'user' instead of 'influencer'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const updateInfluencerData = async (req, res) => {
  try {

    const influencerId = req.params.id;
    
    // Periksa apakah influencerId adalah ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(influencerId)) {
      return res.status(400).json({ message: 'Invalid influencer ID' });
    }

    const userId = req.userId;

    // Temukan influencer yang sesuai dengan ID pengguna
    const influencer = await User.findOne({
      _id: influencerId,
      role: "influencer",
      status: "approved",
    });

    if (!influencer) {
      return res.status(403).json({
        message: "Forbidden - User not authorized",
      });
    }

    // Simpan URL gambar profil lama untuk penghapusan
    const oldProfilePhotoURL = influencer.profile_photo;

    // Handle upload gambar profil menggunakan middleware Multer dan Cloudinary
    upload.single("profile_photo")(req, res, async (err) => {
      if (err) {
        console.error('Error uploading profile photo:', err.message);
        return res.status(400).json({
          message: "Error uploading profile photo",
        });
      }

      // Validasi dan update data influencer
      if (req.body.name) {
        influencer.name = req.body.name;
      }
      if (req.body.address) {
        influencer.address = req.body.address;
      }
      if (req.body.phone) {
        influencer.phone = req.body.phone;
      }
      if (req.body.socialMediaLink) {
        influencer.socialMediaLink = req.body.socialMediaLink;
      }
      if (req.body.password) {
        influencer.password = req.body.password
      }
      if (req.body.category) {
        influencer.category = req.body.category
      }

      // Ambil URL gambar profil dari Cloudinary
      if (req.file && req.file.path) {
        influencer.profile_photo = req.file.path;
      }

      // Simpan perubahan data influencer
      try {
        const updatedInfluencer = await influencer.save();
      
        // Hapus gambar profil lama dari Cloudinary
        if (oldProfilePhotoURL) {
          const publicId = oldProfilePhotoURL.split("/").pop().split(".")[0];
          try {
            const deletionResult = await cloudinary.uploader.destroy(publicId);
            console.log("Hasil penghapusan gambar di Cloudinary:", deletionResult);
      
            if (deletionResult.result === 'not found') {
              console.log('Gambar tidak ditemukan di Cloudinary.');
            } else if (deletionResult.result === 'ok') {
              console.log('Gambar berhasil dihapus di Cloudinary.');
            } else {
              console.log('Hasil yang tidak terduga dari Cloudinary:', deletionResult);
            }
          } catch (deleteError) {
            console.error("Error saat menghapus gambar di Cloudinary:", deleteError);
          }
        }
      
        // Kirim respons ke klien
        res.json({
          message: "Data influencer berhasil diperbarui",
          influencer: updatedInfluencer,
        });
      } catch (saveError) {
        console.error("Error saat menyimpan data influencer:", saveError);
        res.status(500).json({
          message: "Terjadi kesalahan saat menyimpan data influencer",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
