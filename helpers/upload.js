const multer = require("multer");
require("dotenv").config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now().toString()}-${file.originalname}`.replace(/\s/g, "")
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image") || file.mimetype.includes("png")) {
      cb(null, true);
      return;
    }
    const error = new Error(
      "Wrong format ,  your format mast be a image or png "
    );
    error.status = 400;
    cb(error);
  },
});

module.exports = upload;
