module.exports = {
  getTestedAndPositiveInfo: (payload) => {
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
    const monthlyData = [];
    data.reverse().forEach((daily) => {
      const date = daily.date.split("/");
      const newDate = date[1] + "/" + date[0] + "/" + date[2];
      const month = new Date(newDate).getMonth();
      const year = new Date(newDate).getFullYear();
      const monthName = new Intl.DateTimeFormat("pt", {
        month: "short",
      }).format(new Date(newDate));
      const index = monthlyData.findIndex(
        (mt) => mt.month === month && mt.year === year
      );
      if (index !== -1) {
        monthlyData[index].tested += daily.tested || 0;
        monthlyData[index].infected += daily.cases || 0;
      } else {
        monthlyData.push({
          month,
          monthName,
          year,
          tested: daily.tested || 0,
          infected: daily.cases || 0,
        });
      }
    });
    return Array.from(new Set(monthlyData.map((md) => md.year))).map((year) => {
      const obj = {
        year,
        cases: monthlyData
          .filter((md) => md.year === year)
          .map((md) => md.infected),
        tested: monthlyData
          .filter((md) => md.year === year)
          .map((md) => md.tested),
        labels: monthlyData
          .filter((md) => md.year === year)
          .map((md) => md.monthName),
      };
      return obj;
    });
  },
};
