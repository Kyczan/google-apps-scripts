var copyReport = function (src, dest) {
  
  var files = src.getFilesByName(config.filePrefix + config.lastMonth);
  if (!files.hasNext()) return 0;
  
  var fileToCopy = files.next();
  var newFiles = src.getFilesByName(config.filePrefix + config.currMonth);
  if (newFiles.hasNext()) return 0;
  
  var copiedFile = fileToCopy.makeCopy(config.filePrefix + config.currMonth, dest);
  return copiedFile;
}

var calculateRange = function (sheet) {

  var maxRows = sheet.getMaxRows();
  var colA = sheet.getRange(1, 1, maxRows).getValues();
  for (var i = 1; i < maxRows; i++) {
    if (colA[i][0] == '') {
      return i;
    }
  }
  return 0;
}

var getMonthName = function () {

  var months = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
  var month = +config.currMonth.substr(5,2);
  return "'"+months[month-1]+' '+config.currYear;
}

var clearOldData = function (file) {

  var spreadsheet = SpreadsheetApp.open(file);
  var sheet = spreadsheet.getSheets()[0];
  var rowsToDelete = calculateRange(sheet);
  var range = sheet.getRange(3, 4, rowsToDelete - 2, 5);
  range.clearContent();
  
  var monthName = getMonthName();
  sheet.getRange('I1').setValue(monthName);
}
