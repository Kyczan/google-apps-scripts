var config = {
  daysPeriod: 60
};

var scriptProperties = PropertiesService.getScriptProperties();

var setConfig = function () {

  var sqlTab = [
    "select sc.*,",
    "concat(sp.last_name, ' ', sp.first_name) as speaker,",
    "sp.phone as phone,",
    "sp.email as email,",
    "co.name as congregation,",
    "concat(le.number, '. ', le.title) as lecture",
    "from schedule sc",
    "left join speakers sp",
    "on sc.speaker_id = sp.id",
    "left join lectures le",
    "on le.id = sc.lecture_id",
    "left join congregations co",
    "on co.id = sp.congregation_id",
    "where sc.deleted = 'F'"
  ];

  config.sql = sqlTab.join(' ');
  config.calendarId = scriptProperties.getProperty('CALENDAR_ID');
  config.docTitle = scriptProperties.getProperty('DOC_TITLE');
  config.fileName = scriptProperties.getProperty('FILE_NAME');
  config.driveTargetFolder = scriptProperties.getProperty('DRIVE_TARGET_FOLDER');
  config.dbUrl = scriptProperties.getProperty('DB_URL');
  config.user = scriptProperties.getProperty('USER');
  config.userPwd = scriptProperties.getProperty('USER_PWD');
}
