const { getDatabaseData } = require("../utils/firebaseOperations");
const logger = require("../utils");
const fs = require("fs");
module.exports = {
  getFirebaseData: () => {
    return new Promise((resolve) => {
      const localJSON = JSON.parse(fs.readFileSync('/var/covid-tracker-api/covid-tracker-api/static/covid-19-tracker-moz-export.json'));
      resolve(localJSON)
    });
  },
  saveLocalJson: () => {
    getDatabaseData().then((data) => {
      let sanitizedData = JSON.stringify(data)
      logger.dispatch('Saving Local JSON file');
      fs.writeFileSync('/var/covid-tracker-api/covid-tracker-api/static/covid-19-tracker-moz-export.json', sanitizedData)
    })
  }
};
