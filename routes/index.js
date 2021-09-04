const { dashboardData } = require("../controller/");
module.exports = function (app) {
  app.route("/getData").get((req, res) => {
    res.json({
      ...dashboardData(),
    });
  });
};
