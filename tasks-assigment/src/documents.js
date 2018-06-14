var convertToGoogleDocs = function(blobFile) {
  
  var gFile = JSON.parse(UrlFetchApp.fetch(
    "https://www.googleapis.com/upload/drive/v2/files?uploadType=media&convert=true", 
    {
      method: "POST",
      contentType: MimeType.MICROSOFT_WORD,
      payload: blobFile,
      headers: {
        "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
      },
      muteHttpExceptions: true
    }
  ).getContentText());
  
  return DriveApp.getFileById(gFile.id).setName(config.targetFileTitle);
}

var saveFileToDrive = function(file) {

  var destFolder = DriveApp.getFoldersByName(config.driveTargetFolder).next();
  var sourceFolder = DriveApp.getRootFolder();
  var lastFileName = scriptProperties.getProperty('LAST_FILE_NAME') || null;
  var actualFileName = file.getName();
  if (lastFileName) {
    var lastFiles = destFolder.getFilesByName(lastFileName);
    if (lastFiles.hasNext() && lastFileName == actualFileName){
      destFolder.removeFile(lastFiles.next());
    }
  }
  destFolder.addFile(file);
  sourceFolder.removeFile(file);
  scriptProperties.setProperty('LAST_FILE_NAME', actualFileName);
}
