import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import ApiError from './apierror.js';

dotenv.config({ path: './.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const extractPublicId = (fileUrl) => {
  if (!fileUrl) return null;
  const parts = fileUrl.split('/');
  const fileNameWithVersion = parts[parts.length - 1];
  const fileName = fileNameWithVersion.split('.')[0];
  return fileName;
};

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
    });

    if (uploadResult?.secure_url) {
      fs.unlinkSync(localFilePath);
    }

    return uploadResult;
  } catch (error) {
    console.log(error);
    throw new Error('Error in uploading file');
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export const deleteOnCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return null;
    const public_id = extractPublicId(fileUrl);
    const deleteResult = await cloudinary.uploader.destroy(fileUrl, {
      resource_type: 'image',
      invalidate: true,
    });
    return deleteResult;
  } catch (error) {
    throw new Error('Error in deleting file');
  }
};
