import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from '../config.js';
import multer from 'multer';
          
cloudinary.config({ 
  cloud_name: config.CLOUD_NAME, 
  api_key: config.API_KEY,  
  api_secret: config.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile-pictures',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'profile-picture-' + Date.now());
  }
});

const upload = multer({ storage: storage });

export default upload;