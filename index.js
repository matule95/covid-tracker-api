require("dotenv").config();
const { initializeServer } = require("./server");
const { saveLocalJson } = require("./model")
initializeServer();
setInterval(saveLocalJson, 60000)
