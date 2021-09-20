const { getData } = require("../controller/");
module.exports = function (app) {
  app.route("/getData").get((req, res) => {
    getData().then((data) => {
      res.json({
        ...data,
      });
    });
  });
  app.route("/overall").get((req, res) => {
    getData().then((data) => {
      const { dashboard_info, province_distribution } = data;
      res.json({
        dashboard_info,
        province_distribution,
      });
    });
  });
  app.route("/charts").get((req, res) => {
    getData().then((data) => {
      const { charts } = data;
      res.json({
        charts,
      });
    });
  });
  app.route("/country_map").get((req, res) => {
    getData().then((data) => {
      const { country_map_info } = data;
      res.json({
        country_map_info,
      });
    });
  });
};
