var getContactsList = function() {
  var list = [];
  var group = ContactsApp.getContactGroup(config.contactsGroupName);
  var contacts = group.getContacts();
  for (var i in contacts) {
    var emails = contacts[i].getEmails();
    if (emails.length) {
      list.push(emails[0].getAddress());
    }
  }
  return list.join(',');
};
