const fs = require('fs');
const path = require('path');

/**
 * Copies the contents of one folder into another.
 *
 * @param {string} source - The path to the source folder.
 * @param {string} target - The path to the target folder.
 * @returns {void}
 */
function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

const sourceFolder = process.argv[2];
const targetFolder = process.argv[3];

copyFolderSync(sourceFolder, targetFolder);
console.log(`Successfully copied ${sourceFolder} to ${targetFolder}`);
