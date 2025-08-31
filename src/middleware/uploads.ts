import multer from "multer";
import path from "path";
import fs from "fs";
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // save in /uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images, PDF, and Word documents are allowed!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
