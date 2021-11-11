import path from 'path';
import multer from 'multer';

const imagesFolderPath = process.cwd() + '/assets/images';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploadProfilePic = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024
  }
}).single('file');
