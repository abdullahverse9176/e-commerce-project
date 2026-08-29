import { upload } from '../config/cloudinary';

// Re-export upload from config/cloudinary
export { upload };

// Reusable Middleware for Single Image Upload (default field: 'image')
export const uploadSingleImage = (fieldName: string = 'image') => {
  return upload.single(fieldName);
};

// Reusable Middleware for Multiple Images Upload (e.g. for product gallery)
export const uploadMultipleImages = (fieldName: string = 'images', maxCount: number = 5) => {
  return upload.array(fieldName, maxCount);
};
