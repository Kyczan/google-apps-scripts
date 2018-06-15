var createFileName = function(lectures) {
  
  var len = lectures.length;
  if (!len) return;
  
  var first = lectures[0].event_date.substr(5,2);
  var last = lectures[len-1].event_date.substr(5,2);

  if (first == last) {
    config.fileName = first+'. '+config.fileName;
    return;
  }
  config.fileName = first+'-'+last+'. '+config.fileName;
}

var createFile = function(lectures) {
  
  // page width: 595 pts
  // 35 + [75 + 325 + 125] + 35
  var widthSplit = {
    ml: 35,
    col1: 75,
    col2: 325,
    col3: 125,
    mr: 35
  };
  var doc = DocumentApp.create(config.fileName);
  
  var body = doc.getBody();
  body.setMarginLeft(widthSplit.ml);
  body.setMarginRight(widthSplit.mr);
  
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Times New Roman';
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.FONT_SIZE] = 17;
  style[DocumentApp.Attribute.BOLD] = true;
 
  var par = body.insertParagraph(0, config.docTitle);
  par.setAttributes(style);
    
  var table = body.appendTable();
  table.setBorderWidth(0);
  
  for (var i = 0; i < lectures.length; i++) {
  
    var row = table.appendTableRow();
    
    // date cell:
    var styleDate = {};
    styleDate[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
    styleDate[DocumentApp.Attribute.FONT_FAMILY] = 'Times New Roman';
    styleDate[DocumentApp.Attribute.FONT_SIZE] = 13;
    styleDate[DocumentApp.Attribute.BOLD] = false;
    styleDate[DocumentApp.Attribute.ITALIC] = false;
    
    var cellDate = row.appendTableCell();
    cellDate.setText(lectures[i].event_date);
    cellDate.setVerticalAlignment(DocumentApp.VerticalAlignment.CENTER);
    cellDate.setWidth(widthSplit.col1);
    var parDate = cellDate.getChild(0).asParagraph();    
    parDate.setAttributes(styleDate);
    
    // title cell:
    var styleTitle = {};
    styleTitle[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.LEFT;
    styleTitle[DocumentApp.Attribute.FONT_FAMILY] = 'Times New Roman';
    styleTitle[DocumentApp.Attribute.FONT_SIZE] = 15;
    styleTitle[DocumentApp.Attribute.BOLD] = true;
    styleTitle[DocumentApp.Attribute.ITALIC] = true;
    
    var cellTitle = row.appendTableCell();
    cellTitle.setText(lectures[i].lecture);
    cellTitle.setVerticalAlignment(DocumentApp.VerticalAlignment.CENTER);
    cellTitle.setWidth(widthSplit.col2);
    var parTitle = cellTitle.getChild(0).asParagraph();    
    parTitle.setAttributes(styleTitle);

    // speker and congregation cell:
    var styleSpeaker = {};
    styleSpeaker[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT;
    styleSpeaker[DocumentApp.Attribute.FONT_FAMILY] = 'Times New Roman';
    styleSpeaker[DocumentApp.Attribute.FONT_SIZE] = 13;
    styleSpeaker[DocumentApp.Attribute.BOLD] = false;
    styleSpeaker[DocumentApp.Attribute.ITALIC] = false;
    
    var styleCongregation = {};
    styleCongregation[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT;
    styleCongregation[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
    styleCongregation[DocumentApp.Attribute.FONT_SIZE] = 10;
    styleCongregation[DocumentApp.Attribute.BOLD] = false;
    styleCongregation[DocumentApp.Attribute.ITALIC] = false;
 
    var cellSpeaker = row.appendTableCell();
    cellSpeaker.setText(lectures[i].speaker+'\n'+lectures[i].congregation);
    cellSpeaker.setVerticalAlignment(DocumentApp.VerticalAlignment.CENTER);
    cellSpeaker.setWidth(widthSplit.col3);
    var parSpeaker = cellSpeaker.getChild(0).asParagraph();
    parSpeaker.setAttributes(styleSpeaker);
    var parCongregation = cellSpeaker.getChild(1).asParagraph();
    parCongregation.setAttributes(styleCongregation);
  }
  doc.saveAndClose();
  return doc.getId();
}

var moveFile = function(actualFileId) {
  
  var oldFileId = scriptProperties.getProperty('OLD_FILE_ID') || null;  
  var destFolder = DriveApp.getFoldersByName(config.driveTargetFolder).next();
  var sourceFolder = DriveApp.getRootFolder();
  if (oldFileId) {
    try {
      var lastFile = DriveApp.getFileById(oldFileId);
      destFolder.removeFile(lastFile);
    } catch (e) { }
  }
  var actualFile = DriveApp.getFileById(actualFileId);
  destFolder.addFile(actualFile);
  sourceFolder.removeFile(actualFile);
  scriptProperties.setProperty('OLD_FILE_ID', actualFileId);
}
