const { getDatabaseData } = require("../utils/firebaseOperations");
const logger = require("../utils");
const fs = require("fs");
const { getDashboardData } = require("../utils/dashboardInfo");
const { getProvinceDistribution } = require("../utils/provinceDistribution");
const { getGEOJSON } = require("../utils/countryMapInfo");
const { getChartsData } = require("../utils/charts");
const path = "/var/covid-tracker-api/covid-tracker-api/static";
// const path = "./static";
module.exports = {
  getFirebaseData: () => {
    return new Promise((resolve) => {
      const localJSON = JSON.parse(fs.readFileSync(`${path}/payload.json`));
      resolve(localJSON);
    });
  },
  saveLocalJson: () => {
    getDatabaseData().then((data) => {
      let sanitizedData = JSON.stringify(data);
      logger.dispatch("Saving Local JSON file");
      fs.writeFileSync(
        `${path}/covid-19-tracker-moz-export.json`,
        sanitizedData
      );
      const obj = {
        dashboard_info: getDashboardData(data),
        province_distribution: getProvinceDistribution(data),
        country_map_info: { province_stats: getGEOJSON(data) },
        charts: getChartsData(data),
      };
      let sanitizedPayload = JSON.stringify(obj);
      logger.dispatch("Saving Local Payload file");
      fs.writeFileSync(`${path}/payload.json`, sanitizedPayload);
    });
  },
};
