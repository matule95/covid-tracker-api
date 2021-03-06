module.exports = {
  getProvinceDistribution: (data) => {
    return data.dailyInformation[0].province_stats
      .map((province) => {
        const yesterday = data.dailyInformation[1].province_stats.find(
          (item) => item.province === province.province
        );
        return {
          name: province.province,
          cases: province.confirmed,
          flag: module.exports.getFlag(province.province),
          todayCases: Number.parseInt(
            Number.parseInt(province.confirmed) -
              Number.parseInt(yesterday.confirmed)
          ),
          active: province.active,
          todayActive: Number.parseInt(
            Number.parseInt(province.active) - Number.parseInt(yesterday.active)
          ),
          todayRecovered: Number.parseInt(
            Number.parseInt(province.recovered) -
              Number.parseInt(yesterday.recovered)
          ),
          recovered: province.recovered,
          todayDeaths: Number.parseInt(
            Number.parseInt(province.deaths) - Number.parseInt(yesterday.deaths)
          ),
          deaths: province.deaths,
        };
      })
      .sort((a, b) => {
        if (Number.parseInt(a.cases) < Number.parseInt(b.cases)) {
          return 1;
        }
        if (Number.parseInt(a.cases) > Number.parseInt(b.cases)) {
          return -1;
        }
      });
  },
  getFlag: (province) => {
    const flags = {
      "Cabo Delgado": `/icons/cabodelgado.svg`,
      Niassa: `/icons/niassa.svg`,
      Nampula: `/icons/nampula.svg`,
      Zambézia: `/icons/zambezia.svg`,
      Sofala: `/icons/sofala.svg`,
      Manica: `/icons/manica.svg`,
      Tete: `/icons/tete.svg`,
      Gaza: `/icons/gaza.svg`,
      Inhambane: `/icons/inhambane.svg`,
      "Província de Maputo": `/icons/maputo.svg`,
      "Cidade de Maputo": `/icons/maputo.svg`,
    };

    return flags[province];
  },
};
