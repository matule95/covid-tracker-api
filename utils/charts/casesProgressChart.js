module.exports = {
  getProgressChartInfo(data) {
    const infected = [];
    const active = [];
    const recovered = [];
    const deaths = [];
    const labels = [];
    const getDate = (date) => {
      const splitDate = date.split("/");
      const day = splitDate[0];
      const month = splitDate[1];
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return `${day} ${months[Number.parseInt(month - 1)].substring(0, 3)}`;
    };
    data.dailyInformation.forEach((info) => {
      labels.push(getDate(info.date));
      infected.push(info.country_stats.infected);
      active.push(info.country_stats.active);
      recovered.push(info.country_stats.recovered);
      deaths.push(info.country_stats.deaths);
    });
    return {
      infected,
      active,
      recovered,
      deaths,
      labels,
    };
  },
};
