module.exports = {
  getGenderAndNationalityInfo: (data) => {
    return {
      gender_distribution: module.exports.getGenderDistribution(data),
      origin_distribution: module.exports.getOriginDistribution(data),
    };
  },
  getGenderDistribution(data) {
    const newRatioByGender = {
      data: [],
      labels: [],
    };
    const gender = data.weeklyInformation.genderDistribution;
    gender.forEach((item) => {
      newRatioByGender.labels.push(item.gender);
      newRatioByGender.data.push(item.cases);
    });
    return newRatioByGender;
  },
  getOriginDistribution(data) {
    const newRatioByOrigin = {
      data: [],
      labels: [],
    };
    const gender = data.weeklyInformation.originDistribution;
    gender.forEach((item) => {
      newRatioByOrigin.labels.push(item.gender);
      newRatioByOrigin.data.push(item.cases);
    });
    return newRatioByOrigin;
  },
};
