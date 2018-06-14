var createNewFolder = function () {
  
  var mainFolder = DriveApp.getFolderById(config.mainFolderId);
  
  var yearFolders = mainFolder.getFoldersByName(config.currYear);
  if (!yearFolders.hasNext()) {
    var yearFolder = mainFolder.createFolder(config.currYear);
  } else {
    var yearFolder = yearFolders.next();
  }
  
  return yearFolder;
}

var getLastFolder = function () {
  
  var mainFolder = DriveApp.getFolderById(config.mainFolderId);
  var yearFolders = mainFolder.getFoldersByName(config.lastYear);
  
  if (!yearFolders.hasNext()) return 0;
  
  var yearFolder = yearFolders.next();
  return yearFolder;
}
