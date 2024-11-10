import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log('file is uploaded succesfully to cloud', uploadResult.url);
    console.log(uploadResult);
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    console.log(error);

    return null;
  }
};

const deleteOnCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return null;
    // delete an image
    const deleteResult = await cloudinary.uploader.destroy(fileUrl, {
      resource_type: 'auto',
      invalidate: true,
    });

    console.log('file is deleted succesfully from cloud', deleteResult.url);
    return deleteResult;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
