const fs = require('fs');
const path = require('path');

/**
 * Copies a file from the source file path to the target folder path.
 *
 * @param {string} sourceFile - The path of the source file.
 * @param {string} targetFolder - The path of the target folder.
 * @return {undefined} - This function does not return a value.
 */
function copyFile(sourceFile, targetFolder) {
  const fileName = path.basename(sourceFile);
  const targetPath = path.join(targetFolder, fileName);

  fs.copyFile(sourceFile, targetPath, (err) => {
    if (err) {
      console.error(`Failed to copy ${sourceFile} to ${targetFolder}:`, err);
    } else {
      console.log(`Successfully copied ${sourceFile} to ${targetFolder}`);
    }
  });
}

const sourceFile = process.argv[2];
const targetFolder = process.argv[3];

copyFile(sourceFile, targetFolder);
