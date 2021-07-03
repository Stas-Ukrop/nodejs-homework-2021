const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.NAME_CLOUD,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const uploadCloud = promisify(cloudinary.uploader.upload);
class UploadService {
  async saveAvatar(path, cloudAvatar) {
    const { public_id, secure_url } = await uploadCloud(path, {
      public_id: cloudAvatar?.replace("Avatar/", ""),
      folder: "Avatar",
      transformation: { width: 250, height: 250, crop: "pad" },
    });
    return { cloudAvatar: public_id, urlAvatar: secure_url };
  }
}

module.exports = UploadService;
