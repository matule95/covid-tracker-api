const { getDashboardData } = require("../utils/dashboardInfo");
const { getProvinceDistribution } = require("../utils/provinceDistribution");
const { getGEOJSON } = require("../utils/countryMapInfo");
const { getChartsData } = require("../utils/charts");
const { getFirebaseData } = require("../model");
module.exports = {
  dashboardData: () => {
    const data = getFirebaseData();
    return {
      dashboard_info: getDashboardData(data),
      province_distribution: getProvinceDistribution(data),
      country_map_info: { province_stats: getGEOJSON(data) },
      charts: getChartsData(data),
    };
  },
};
