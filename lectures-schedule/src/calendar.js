var getSpeaker = function(txt) {

  var ind = txt.indexOf(' nr');
  if (ind > -1) {
    return txt.substr(0,ind);
  }
  return txt;
}

var getLectureTitle = function(txt) {

  var re = /(\d+. )?(\[Z\])?(.*)/i;
  var found = txt.match(re);
  return found[3];
}

var getLectureDate = function(date) {
  
  return date.toJSON().substr(0,10);
}

var getLectures = function() {

  var data = [];
  var now = new Date();
  var future = new Date(now.getTime() + (config.daysPeriod * 24 * 60 * 60 * 1000));
  var calendar = CalendarApp.getCalendarById(config.calendarId);
  var events = calendar.getEvents(now, future);
  
  for (var i = 0; i < events.length; i++) {
    var obj = {};
    obj.speaker = getSpeaker(events[i].getTitle());
    obj.title = getLectureTitle(events[i].getDescription());
    obj.date = getLectureDate(events[i].getEndTime());
    
    data.push(obj);
  }
  return data;
}
