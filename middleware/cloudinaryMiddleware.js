import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
          
cloudinary.config({ 
  cloud_name: 'dgrwroy2v', 
  api_key: '673781125794836', 
  api_secret: 'ZNPQqJqw4nxJBWrfHtWtqu6Oq98' 
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