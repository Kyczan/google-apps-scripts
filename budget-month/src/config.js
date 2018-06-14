var config = {
  today: new Date()
}

var scriptProperties = PropertiesService.getScriptProperties();

var setConfig = function () {

  config.mainFolderId = scriptProperties.getProperty('MAIN_FOLDER_ID');
  config.filePrefix = scriptProperties.getProperty('FILE_PREFIX');
}
