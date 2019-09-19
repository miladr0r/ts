const express = require("express");
const app = express();
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://49cd9ad5aa7749a597db7d5886739a1b@sentry.io/1370170"
});
app.use(Sentry.Handlers.requestHandler());

app.get("/", (req, res, next) => {
  res.send("hi world");
});

//route for check sentry work.
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


app.use(Sentry.Handlers.errorHandler());
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("start server on port: " + port);
});

module.exports = server;