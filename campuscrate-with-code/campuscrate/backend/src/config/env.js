import dotenv from 'dotenv';
dotenv.config();

export const {
  MONGO_URI,
  JWT_SECRET,
  CLIENT_ORIGIN,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS
} = process.env;
