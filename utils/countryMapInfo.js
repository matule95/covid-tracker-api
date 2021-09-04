module.exports = {
  getGEOJSON(data) {
    return data.dailyInformation[0].province_stats;
  },
};
