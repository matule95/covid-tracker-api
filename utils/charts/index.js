const { getAgeDistribution } = require("./ageDistributionChart");
const { getGenderAndNationalityInfo } = require("./genderAndNationalityChart");
const { getProgressChartInfo } = require("./casesProgressChart");
const { getTestedAndPositiveInfo } = require("./testedAndPositiveChart");
const { getWeeklyCasesInfo } = require("./weeklyCasesChart");
module.exports = {
  getChartsData(data) {
    return {
      age_chart_info: getAgeDistribution(data),
      gender_and_nationality_info: getGenderAndNationalityInfo(data),
      progress_chart_info: getProgressChartInfo(data),
      tested_and_positive_info: getTestedAndPositiveInfo(data),
      weekly_cases_info: getWeeklyCasesInfo(data),
    };
  },
};
