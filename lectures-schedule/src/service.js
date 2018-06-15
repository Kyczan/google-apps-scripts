var getDataFromService = function () {
  
  var options = {
    method : 'post',
    contentType: 'application/json',
    payload : JSON.stringify({
      request: 'schedule'
    }),
    headers: {
      authorization: config.authorization
    }
  };
  var response = UrlFetchApp.fetch(config.fetchUrl, options);
  return JSON.parse(response);
};

var sortRepairData = function (data) {

  function extractTitle (lecture) {
    var re = /(\d+. )?(\[Z\])?(.*)/i;
    var found = lecture.match(re);
    return found[3];
  }
  
  function extractLectureNumber (lecture) {
    var tab = lecture.split('.');
    if (tab.length)
      return tab[0];
    return '';
  }
  
  function invertName (speaker) {
    var tab = speaker.split(' ');
    var lastName = tab[0];
    tab.shift();
    tab.push(lastName);
    return tab.join(' ');
  }
  
  function compare(a,b) {
    if (a.event_date < b.event_date)
      return -1;
    if (a.event_date > b.event_date)
      return 1;
    return 0;
  }

  var sorted = data.sort(compare);
  
  function mappingFn (v) {
    if (v.lecture === null) v.lecture = '';
    v.lecture_nr = extractLectureNumber(v.lecture);
    if (v.lecture) v.lecture = extractTitle(v.lecture);
    if (v.speaker === null) v.speaker = '';
    if (v.speaker) v.speaker = invertName(v.speaker);
    if (v.note && !v.lecture) v.lecture = v.note;
    if (v.congregation === null) v.congregation = '';
    return v;
  }
  return sorted.map(mappingFn);
};

var filterDataPeriod = function (data) {

  var now = new Date();
  var future = new Date(now.getTime() + (config.daysPeriod * 24 * 60 * 60 * 1000));
  var today = now.toJSON().substr(0,10);
  var futureDay = future.toJSON().substr(0,10);
  
  function filterCriteria(obj) {
    return obj.event_date >= today && obj.event_date <= futureDay && obj.deleted == 'F';
  }

  var filtered = data.filter(filterCriteria);
  return sortRepairData(filtered);
};

var filterDataChanged = function (data) {

  var today = (new Date()).toJSON().substr(0,10);
  function filterCriteria(obj) {
    return obj.modify_date >= today && obj.deleted == 'F';
  }
  
  var filtered = data.filter(filterCriteria);
  return sortRepairData(filtered);
};
