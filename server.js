const logger = require("./utils");
module.exports = {
  initializeServer: () => {
    logger.dispatch("Initializing Express Server");
    const express = require("express");
    const cors = require("cors");
    const app = express();
    const port = 80;
    const fs = require("fs");
    const https = require("https");
    const routes = require("./routes/");
    routes(app);
    app.use(
      cors({
        origin: [
          "https://covid19.co.mz",
          "http://covid19.co.mz",
          "https://covidmoz.netlify.app/",
        ],
        methods: ["GET"],
      })
    );
    app.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} doesn't exist` });
    });
    app.listen(port);
    logger.dispatch(`Express Server running on port:${port}`);
    const httpsServer = https.createServer(
      {
        key: fs.readFileSync(
          "/etc/letsencrypt/live/api.covid19.co.mz/privkey.pem"
        ),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/api.covid19.co.mz/fullchain.pem"
        ),
      },
      app
    );

    httpsServer.listen(443, () => {
      console.log("HTTPS Server running on port 443");
    });
  },
};
