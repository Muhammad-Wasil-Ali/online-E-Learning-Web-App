import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + file.filename + file.originalname;

    cb(null, uniqueName);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      uuidv4() + "-" + file.fieldname + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
export const uploadImage = multer({ storage: imageStorage });

export const uploadVideo = multer({ storage: videoStorage });
