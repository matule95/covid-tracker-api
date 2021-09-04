let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyDlm8ZeIzo0I_zClTrNAkFgJti3I-oGX0w",
  authDomain: "covid-19-tracker-moz.firebaseapp.com",
  databaseURL: "https://covid-19-tracker-moz.firebaseio.com",
  projectId: "covid-19-tracker-moz",
  storageBucket: "covid-19-tracker-moz.appspot.com",
  messagingSenderId: "536171650610",
  appId: "1:536171650610:web:26cad8c7e170c2a9f7262b",
  measurementId: "G-8GZ5N5EZS4",
};
firebase.initializeApp(firebaseConfig);
module.exports = {
  getDatabaseData() {
    let information = {};
    const database = firebase.database();
    return new Promise(async (resolve, reject) => {
      await database.ref("/").on("value", async (data) => {
        information = await data.val();
        return resolve(information);
      });
    });
  },
};
