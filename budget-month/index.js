/*
 * Script runs every 1st day of month and creates new folder
 * for new billing month and copies into it billing sheet
 */

function app () {

  setConfig();

  var newFolder = createNewFolder();
  if (newFolder) {
  
    var oldFolder = getLastFolder();
    if (oldFolder) {
    
      var newBudgetFile = copyBudget(oldFolder, newFolder);
      if (newBudgetFile) {
        
        clearOldData(newBudgetFile);
      }      
    }
  }
}
