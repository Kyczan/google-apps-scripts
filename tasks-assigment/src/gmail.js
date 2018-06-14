var createFilename = function(title) {
  
  for (var i = 0; i < config.searchTab.length; i++) {
    if (title.toLowerCase().search(config.searchTab[i]) > -1) {
      break;
    }
  }
  if (i < 12) {
    config.targetFileTitle = ('0'+(++i)).substr(-2)+'. '+config.targetFileTitle;
  }
}

var getDesiredAttFromMail = function() {

  var threads = GmailApp.search(config.gmailSearchCriteria);
  var msgs = GmailApp.getMessagesForThreads(threads);
  var actualEmail = msgs[0][0];
  var actualEmailSubject = actualEmail.getSubject();
  var actualEmailDetails = actualEmail.getDate().toJSON();
  var atts = actualEmail.getAttachments();
  var att = atts[0];
  var attName = att.getName();
  var lastEmailDetails = scriptProperties.getProperty('LAST_EMAIL_DETAILS') || null;
  
  if (lastEmailDetails == actualEmailDetails || attName != config.gmailAttName) {
    // no new email or email has wrong attachment
    return 0;
  }
  createFilename(actualEmailSubject);
  scriptProperties.setProperty('LAST_EMAIL_DETAILS', actualEmailDetails);
  return att;
}

var sendEmailToGroup = function(att) {

   var emailList = getContactsList();
   GmailApp.sendEmail( null, config.targetFileTitle, config.gmailBody, {
       attachments: [att],
       name: config.gmailSenderName,
       bcc: emailList
   });
}
