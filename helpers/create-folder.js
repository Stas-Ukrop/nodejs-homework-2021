const fs = require("fs/promises");

const isAccessible = (pathFile) => {
  return fs
    .access(pathFile)
    .then(() => true)
    .catch(() => false);
};

const createFolder = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolder;
