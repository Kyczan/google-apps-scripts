var config = {};

var setDates = function() {
  var now = new Date();
  var nowJson = now.toJSON();
  config.currYear = nowJson.substr(0, 4);

  now.setYear(now.getYear() - 1);
  var pastJson = now.toJSON();
  config.lastYear = pastJson.substr(0, 4);
};

var setConfig = function() {
  setDates();
  var scriptProperties = PropertiesService.getScriptProperties();
  config.mainFolderId = scriptProperties.getProperty('MAIN_FOLDER_ID');
  config.outFileId = scriptProperties.getProperty('OUT_FILE_ID');
};
