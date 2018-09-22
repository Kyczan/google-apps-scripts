var writeData = function (robustData) {

  var heading = ['miesiąc', 'publikacje', 'filmy', 'godziny', 'odwiedziny', 'studia', 'uwagi'];
  var data = processData(robustData);
  var file = DriveApp.getFileById(config.outFileId);
  var spreadsheet = SpreadsheetApp.open(file);
  var sheet = spreadsheet.getSheets()[0];
  var offset = 0;
  sheet.clear();
  
  for (var i = 0; i < data.length; i++) {
  
    // name
    var range = sheet.getRange(offset + 1, 1);
    range.setValue(data[i].name);
    range.setFontWeight("bold");
    range.setFontSize(18);
    
    // heading
    range = sheet.getRange(offset + 2, 1, 1, 7);
    range.setValues([heading]);
    range.setBackground('#bae1ff');
    range.setBorder(true, true, true, true, true, false);
    range.setFontWeight("bold");
    range.setHorizontalAlignment("center");
    
    // data
    range = sheet.getRange(offset + 3, 1, data[i].data.length, 7);
    range.setValues(data[i].data);
    range.setBorder(true, true, true, true, true, true);
    range.setHorizontalAlignment("center");
    
    offset = offset + data[i].data.length + 4;
  }
  sheet.setColumnWidths(2, 5, 80);
  sheet.autoResizeColumns(7,1);
  range = sheet.getRange('G:G');
  range.setHorizontalAlignment("left");
}

var processData = function (inputData) {

  function compare (a, b) {
    // is active
    if ( a[8] != b[8] && a[8] == 'nieczynny') return 1;
    if ( a[8] != b[8] && b[8] == 'nieczynny' ) return -1;
    // lastname
    if ( a[1] < b[1] ) return -1;
    if ( a[1] > b[1] ) return 1;
    // firstname
    if ( a[2] < b[2] ) return -1;
    if ( a[2] > b[2] ) return 1;
    // date
    if ( a[0] < b[0] ) return -1;
    if ( a[0] > b[0] ) return 1;

    return 0;
  }
  
  var data = [];
  var finalData = [];
  var finalIndex = -1;
  var name = '';
  for (var i = 0; i < inputData.length; i++) {
    var monthData = inputData[i];
    for (var j = 0; j < monthData.length; j++) {
      data.push(monthData[j]);
    }
  }
  data.sort(compare);
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] + ' ' + data[i][2] !== name) { // next person
      ++finalIndex;
      name = data[i][1] + ' ' + data[i][2];
      finalData[finalIndex] = {
        name: name,
        data: []
      }
    }
    finalData[finalIndex].data.push([data[i][0],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8]]);
  }
  
  return finalData;
}
