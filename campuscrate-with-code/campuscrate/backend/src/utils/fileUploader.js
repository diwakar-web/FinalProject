import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'campuscrate',
    resource_type: 'image',
    format: 'jpg'
  })
});

export const upload = multer({ storage });
