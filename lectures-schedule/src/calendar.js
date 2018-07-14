var modifyCalendar = function(data) {

  var calendar = CalendarApp.getCalendarById(config.calendarId);
  
  for (var i = 0; i < data.length; i++) {
    var eventDate = new Date(data[i].event_date+'T00:00:00');
    var events = calendar.getEventsForDay(eventDate);
    if (events.length) {
      events[0].deleteEvent();
    }
    
    var speaker = (data[i].speaker ? data[i].speaker : data[i].lecture);
    if (speaker) {
      var eventTitle = (data[i].lecture_nr ? speaker+' nr '+data[i].lecture_nr : speaker);
      var eventStart = new Date(data[i].event_date+'T'+data[i].event_time+':00');
      var eventEnd = new Date(eventStart.getTime() + (30 * 60 * 1000));
      var eventDesc = (data[i].lecture_nr ? data[i].lecture_nr+'. '+data[i].lecture : data[i].lecture);
      var event = calendar.createEvent(
        eventTitle,
        eventStart,
        eventEnd,
        { description: eventDesc }
      );
    }
  }
}
