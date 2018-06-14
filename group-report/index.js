/*
 * Script runs every 25th day of month, copies
 * old report, creates new one and cleans data inside
 */

function app () {

  setConfig();

  var oldFolder = getLastFolder();
  
  if (oldFolder) {
    var newFolder = createNewFolder();
    var newReportFile = copyReport(oldFolder, newFolder);
    
    if (newReportFile) {
      clearOldData(newReportFile);
    }   
  }
}
