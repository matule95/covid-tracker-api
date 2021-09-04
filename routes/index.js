const { getData } = require("../controller/");
module.exports = function (app) {
  app.route("/getData").get((req, res) => {
    getData().then((data) => {
      res.json({
        ...data,
      });
    });
  });
};
