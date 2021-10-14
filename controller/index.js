const { getFirebaseData } = require("../model");
module.exports = {
  getData: () => {
    return new Promise((resolve) => {
      getFirebaseData().then((data) => {
        return resolve(data);
      });
    });
  },
};
