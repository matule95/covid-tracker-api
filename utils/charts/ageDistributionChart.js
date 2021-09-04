module.exports = {
  getAgeDistribution: (data) => {
    const chartData = {
      data: [],
      labels: [],
    };
    const ages = data.weeklyInformation.ageDistribution;
    ages.forEach((item) => {
      chartData.labels.push(item.age);
      chartData.data.push(item.cases);
    });
    return chartData;
  },
};
