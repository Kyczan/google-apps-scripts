/*
 * Script runs every day, reads data from external service,
 * writes it to calendar and into doc and puts doc into Drive
 */

function app() {

  setConfig();
  
  var data = getDataFromService();
  
  var lectures = filterDataPeriod(data);
  if (lectures.length) {
    createFileName(lectures);
    var doc = getActualFile();
    writeFile(lectures, doc);
  }
  
  var changedLectures = filterDataChanged(data);
  if (changedLectures.length) {
    modifyCalendar(changedLectures);
  }
}
