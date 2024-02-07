import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (!hashedPassword) {
      return res.status(500).json({
        message: "Error hashing password",
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path;

    const newUser = new User({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      socialMediaLink: req.body.socialMediaLink,
      category: req.body.category,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "influencer",
      profile_photo: imageUrl,
      status: "pending",
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({
        message: "Error saving user",
      });
    }

    // Kirim email notifikasi ke admin
    sendNotificationEmail(savedUser);

    res.json({
      message: "Registration successful. Waiting for admin approval.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

const sendNotificationEmail = (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mrizqiassh18@gmail.com", // Ganti dengan email Anda
      pass: "Rizqirizqi123", // Ganti dengan password email Anda
    },
  });

  const mailOptions = {
    from: "pbig146@gmail.com", // Ganti dengan email Anda
    to: "mrizqiassh18@gmail.com", // Ganti dengan email admin
    subject: "New Influencer Registration",
    text: `A new influencer registration waiting for approval.\n\nName: ${user.name}\nEmail: ${user.email}\n\nPlease login to the admin dashboard to approve or reject.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};