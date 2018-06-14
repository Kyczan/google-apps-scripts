/*
 * Script checks if there is new, specified mail in Gmail inbox.
 * It takes attachment from it, sends it to mailing group,
 * also converts to google doc and puts to Google Drive.
 */

function main() {

  setConfig();

  var att = getDesiredAttFromMail();
  if (att) {
    var file = convertToGoogleDocs(att);
    saveFileToDrive(file);
    sendEmailToGroup(att);
  }
}
