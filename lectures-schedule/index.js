/*
 * Script runs every day, reads data from calendar,
 * writes it to doc and puts into Drive
 */

function main() {
  
  var lectures = getLectures();
  createFileName(lectures);
  var actualFileId = createFile(lectures);
  moveFile(actualFileId);
}
