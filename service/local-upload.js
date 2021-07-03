const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const createFolder = require("../helpers/create-folder");

class UploadAvatar {
  constructor(folder) {
    this.folder = folder;
  }
  async transformAvatar(pathFile) {
    const avatar = await jimp.read(pathFile);
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }
  async saveAvatar({ idUser, file }) {
    await this.transformAvatar(file.path);
    const folderAvatar = path.join(this.folder, file.fieldname, idUser);
    await createFolder(folderAvatar);
    await fs.rename(file.path, path.join(folderAvatar, file.filename));
    return path.normalize(path.join(file.fieldname, idUser, file.filename));
  }
}

module.exports = UploadAvatar;
