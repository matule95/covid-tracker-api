const moment = require("moment");
module.exports = {
  getWeeklyCasesInfo: (payload) => {
    const data = payload.dailyInformation.map((dailyInfo, index) => {
      const stats = payload.dailyInformation;
      const daily = {};
      const yesterday = stats[index + 1] ? stats[index + 1].country_stats : 0;
      daily.date = dailyInfo.date;
      daily.tested =
        parseInt(dailyInfo.country_stats.tested) - parseInt(yesterday.tested);
      daily.infected = parseInt(dailyInfo.country_stats.infected);
      daily.cases =
        parseInt(dailyInfo.country_stats.infected) -
        parseInt(yesterday.infected);
      return daily;
    });
    const weeklyData = [];
    data.reverse().forEach((daily) => {
      const date = daily.date.split("/");
      const newDate = date[1] + "/" + date[0] + "/" + date[2];
      const momentDate = date[2] + "-" + date[1] + "-" + date[0];
      const month = new Date(newDate).getMonth();
      const year = new Date(newDate).getFullYear();
      const week = moment(momentDate).isoWeek();
      const monthName = new Intl.DateTimeFormat("pt", {
        month: "short",
      }).format(new Date(newDate));
      const selectedDate = moment(momentDate, "YYYY-MM-DD");
      const fromDate = selectedDate.startOf("isoWeek").format("DD-MM");
      const toDate = selectedDate.endOf("isoWeek").format("DD-MM");
      const weekName = `${fromDate} - ${toDate}`;
      const index = weeklyData.findIndex(
        (mt) => mt.month === month && mt.year === year && mt.week === week
      );
      if (index !== -1) {
        weeklyData[index].tested += daily.tested || 0;
        weeklyData[index].infected += daily.cases || 0;
      } else {
        weeklyData.push({
          month,
          monthName,
          year,
          week,
          weekName,
          tested: daily.tested || 0,
          infected: daily.cases || 0,
        });
      }
    });
    const years = Array.from(new Set(weeklyData.map((md) => md.year)));
    const newData = [];
    years.forEach((year) => {
      const obj = {
        year,
        data: weeklyData
          .filter((wk) => wk.year === year)
          .map((dt) => dt.infected),
        labels: weeklyData
          .filter((wk) => wk.year === year)
          .map((dt) => dt.weekName),
      };
      newData.push(obj);
    });
    return newData;
  },
};
