var config = {
  daysPeriod:         60
};

var scriptProperties = PropertiesService.getScriptProperties();

var setConfig = function () {

  config.calendarId = scriptProperties.getProperty('CALENDAR_ID');
  config.docTitle = scriptProperties.getProperty('DOC_TITLE');
  config.fileName = scriptProperties.getProperty('FILE_NAME');
  config.driveTargetFolder = scriptProperties.getProperty('DRIVE_TARGET_FOLDER');
}
