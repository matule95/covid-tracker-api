module.exports = {
  getRecoveredPercentage(data) {
    const recoveredObj = {};
    recoveredObj.value = parseFloat(
      (data.recovered.today * 100) / data.infected.today
    ).toFixed(2);
    const variation = parseFloat(
      ((data.recovered.today - data.recovered.variation) * 100) /
        data.infected.today
    ).toFixed(2);
    recoveredObj.variation = (
      parseFloat(recoveredObj.value) - parseFloat(variation)
    ).toFixed(2);
    return recoveredObj;
  },
  getInfectedPercentage(data, period) {
    const selectedPeriod = period === "all-time" ? "today" : "variation";
    const posObj = {};
    posObj.value = parseFloat(
      (data.infected[selectedPeriod] * 100) / data.tested[selectedPeriod]
    ).toFixed(2);
    return posObj;
  },
  getDashboardData(data) {
    const statistics = data.dailyInformation[0].country_stats;
    const yesterday = data.dailyInformation[1].country_stats;
    const sanitizedInfo = {
      tested: {
        today: statistics.tested,
        variation:
          Number.parseInt(statistics.tested) -
          Number.parseInt(yesterday.tested),
      },
      infected: {
        today: statistics.infected,
        variation:
          Number.parseInt(statistics.infected) -
          Number.parseInt(yesterday.infected),
      },
      active: {
        today:
          Number.parseInt(statistics.infected) -
          Number.parseInt(statistics.recovered) -
          Number.parseInt(statistics.deaths) -
          Number.parseInt(statistics.other_deaths),
        variation:
          Number.parseInt(statistics.infected) -
          Number.parseInt(statistics.recovered) -
          Number.parseInt(statistics.deaths) -
          [
            Number.parseInt(yesterday.infected) -
              Number.parseInt(yesterday.recovered) -
              Number.parseInt(yesterday.deaths),
          ],
      },
      deaths: {
        today: statistics.deaths,
        variation:
          Number.parseInt(statistics.deaths) -
          Number.parseInt(yesterday.deaths),
      },
      recovered: {
        today: statistics.recovered,
        variation:
          Number.parseInt(statistics.recovered) -
          Number.parseInt(yesterday.recovered),
      },
      local_transmission: {
        today: statistics.local_transmissions,
        variation:
          Number.parseInt(statistics.local_transmissions) -
          Number.parseInt(yesterday.local_transmissions),
      },
      foreign_transmission: {
        today: statistics.foreign_transmissions,
        variation:
          Number.parseInt(statistics.foreign_transmissions) -
          Number.parseInt(yesterday.foreign_transmissions),
      },
      hospitalized: {
        today: statistics.hospitalized,
        variation:
          Number.parseInt(statistics.hospitalized) -
          Number.parseInt(yesterday.hospitalized),
      },
      other_deaths: statistics.other_deaths,
      last_updated: `${data.dailyInformation[0].date} ${data.dailyInformation[0].updatedAt}`,
    };
    const all_time_infected_percentage = module.exports.getInfectedPercentage(
      sanitizedInfo,
      "all-time"
    );
    const today_infected_percentage = module.exports.getInfectedPercentage(
      sanitizedInfo,
      "today"
    );
    const recovered_percentage =
      module.exports.getRecoveredPercentage(sanitizedInfo);
    return {
      ...sanitizedInfo,
      all_time_infected_percentage,
      today_infected_percentage,
      recovered_percentage,
    };
  },
};
