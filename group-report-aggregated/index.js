/*
 * Script runs every day, gets data from monthly reports,
 * aggregates data by name and puts to separate file
 */

function app() {
  setConfig();
  var data = readAllFiles();
  writeData(data);
}
