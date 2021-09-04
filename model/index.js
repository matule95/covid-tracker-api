const { getDatabaseData } = require("../utils/firebaseOperations");
module.exports = {
  getFirebaseData: () => {
    return new Promise((resolve) => {
      getDatabaseData().then((data) => {
        resolve(data);
      });
    });
  },
};
