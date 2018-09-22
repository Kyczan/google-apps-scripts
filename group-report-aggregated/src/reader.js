var readAllFiles = function() {
  var allData = [];
  var fileIds = getFileIds();

  for (var i = 0; i < fileIds.length; i++) {
    allData[i] = readSingleFile(fileIds[i].id, fileIds[i].name);
  }
  return allData;
};

var readSingleFile = function(fileId, filename) {
  var month = "'" + filename.slice(-7);
  var file = DriveApp.getFileById(fileId);
  var spreadsheet = SpreadsheetApp.open(file);
  var sheet = spreadsheet.getSheets()[0];
  var lastRow = calculateRange(sheet);
  var values = sheet.getRange(3, 2, lastRow - 2, 8).getDisplayValues();

  for (var i = 0; i < values.length; i++) {
    values[i].unshift(month);
  }

  return values;
};

var calculateRange = function(sheet) {
  var maxRows = sheet.getMaxRows();
  var colA = sheet.getRange(1, 1, maxRows).getValues();
  for (var i = 1; i < maxRows; i++) {
    if (colA[i][0] == '') {
      return i;
    }
  }
  return 0;
};

var getFileListFromYear = function(yr) {
  var fileIds = [];
  var mainFolder = DriveApp.getFolderById(config.mainFolderId);
  var yearFolders = mainFolder.getFoldersByName(yr);
  if (!yearFolders.hasNext()) return [];

  var yearFolder = yearFolders.next();
  var yearFiles = yearFolder.getFiles();

  while (yearFiles.hasNext()) {
    var file = yearFiles.next();
    fileIds.push({ id: file.getId(), name: file.getName() });
  }

  return fileIds;
};

var getFileIds = function() {
  function compare(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  var currYearFiles = getFileListFromYear(config.currYear);
  var lastYearFiles = getFileListFromYear(config.lastYear);
  var files = currYearFiles.concat(lastYearFiles);

  files.sort(compare);

  return files.slice(-12);
};
