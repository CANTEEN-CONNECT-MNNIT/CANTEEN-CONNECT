import multer from 'multer';
import fs from 'fs';
import path from 'path';
import ApiError from '../utils/apierror.js';

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const foodItemDir = path.resolve('./public/FoodItem');

    // Ensure directory exists or create it synchronously
    if (!fs.existsSync(foodItemDir)) {
      try {
        fs.mkdirSync(foodItemDir, { recursive: true });
      } catch (err) {
        return cb(new ApiError('Failed to create upload directory'));
      }
    }
    cb(null, foodItemDir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const task_id = req.params.id;
    cb(null, `user-${req.user._id}-task-${task_id}.${extension}`);
  },
});

const multerfilter = (req, file, cb) => {
  if (!file) {
    return cb(null, true); // Allow empty file uploads (if intended)
  }
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept only images
  } else {
    cb(new ApiError('File type must be an image'));
  }
};

export const upload = multer({
  storage: multerstorage,
  fileFilter: multerfilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});
