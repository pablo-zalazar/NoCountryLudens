import multer from "multer";
// Node 14 path import
import path from "path";
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(__dirname + "/images");
    callback(null, path.join(__dirname, "/images"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, new Date().toISOString().replace(/:/g, "-") + name);
  }
});

// Filtering MIMETYPES
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    req.mimetypeError = true; // to know if an mimetype error was produced.
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
