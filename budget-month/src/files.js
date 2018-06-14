var copyBudget = function (src, dest) {
  
  var oldName = src.getName();
  var files = src.getFilesByName(config.filePrefix + oldName);
  
  if (!files.hasNext()) return 0;
  
  var newName = dest.getName();
  var fileToCopy = files.next();
  var copiedFile = fileToCopy.makeCopy(config.filePrefix + newName, dest);
  
  return copiedFile;
}

var calculateRange = function (sheet) {

  var maxRows = sheet.getMaxRows();
  var colA = sheet.getRange(1, 1, maxRows).getValues();
  for (var i = 0; i < maxRows; i++) {
    if (colA[i][0] == 'suma') {
      return i;
    }
  }
  return 0;
}

var clearOldData = function (file) {

  var spreadsheet = SpreadsheetApp.open(file);
  var sheet = spreadsheet.getSheets()[0];
  var rowsToDelete = calculateRange(sheet);
  var range = sheet.getRange(5, 4, rowsToDelete - 4);
  range.clearContent();
}
