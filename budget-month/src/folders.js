var createNewFolder = function () {
  
  var now = config.today.toJSON();
  var year = now.substr(0,4);
  var month = now.substr(0,7);
  var mainFolder = DriveApp.getFolderById(config.mainFolderId);
  
  var yearFolders = mainFolder.getFoldersByName(year);
  if (!yearFolders.hasNext()) {
    var yearFolder = mainFolder.createFolder(year);
  } else {
    var yearFolder = yearFolders.next();
  }
  
  var monthFolders = yearFolder.getFoldersByName(month);
  if (monthFolders.hasNext()) {
    return 0;
  }
  
  var monthFolder = yearFolder.createFolder(month);
  return monthFolder;
}

var getLastFolder = function () {
  
  var n = config.today;
  n.setMonth(n.getMonth()-1);
  var past = n.toJSON();
  var year = past.substr(0,4);
  var month = past.substr(0,7);
  var mainFolder = DriveApp.getFolderById(config.mainFolderId);
  
  var yearFolders = mainFolder.getFoldersByName(year);
  if (!yearFolders.hasNext()) {
    return 0;
  } else {
    var yearFolder = yearFolders.next();
  }
  
  var monthFolders = yearFolder.getFoldersByName(month);
  if (!monthFolders.hasNext()) {
    return 0;
  }
  
  var monthFolder = monthFolders.next();
  return monthFolder;
}
