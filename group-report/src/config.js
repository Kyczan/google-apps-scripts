var config = {}

var setDates = function () {

  var now = new Date();
  
  var nowJson = now.toJSON();
  config.currYear = nowJson.substr(0,4);
  config.currMonth = nowJson.substr(0,7);
  
  now.setMonth(now.getMonth()-1);
  var pastJson = now.toJSON();
  config.lastYear = pastJson.substr(0,4);
  config.lastMonth = pastJson.substr(0,7);
}

var setConfig = function () {

  setDates();
  var scriptProperties = PropertiesService.getScriptProperties();
  config.mainFolderId = scriptProperties.getProperty('MAIN_FOLDER_ID');
  config.filePrefix = scriptProperties.getProperty('FILE_PREFIX');
}
