var config = {
  searchTab: ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','pażdziernik','listopad','grudzień']
};

var scriptProperties = PropertiesService.getScriptProperties();

var setConfig = function () {

  config.gmailSearchCriteria = scriptProperties.getProperty('GMAIL_SEARCH_CRITERIA');
  config.gmailAttName = scriptProperties.getProperty('GMAIL_ATT_NAME');
  config.gmailBody = scriptProperties.getProperty('GMAIL_BODY');
  config.gmailSenderName = scriptProperties.getProperty('GMAIL_SENDER_NAME');
  config.driveTargetFolder = scriptProperties.getProperty('DRIVE_TARGET_FOLDER');
  config.contactsGroupName = scriptProperties.getProperty('CONTACTS_GROUP_NAME');
  config.targetFileTitle = scriptProperties.getProperty('TARGET_FILE_TITLE');
}
