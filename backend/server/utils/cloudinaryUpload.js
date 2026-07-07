import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'fullstack-app',
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw new Error('Failed to upload to Cloudinary');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
