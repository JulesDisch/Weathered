require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const models = require('./models');
const routes = require("./routes");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  secret: 'something',
}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

models.sequelize.sync().then(function () {
  console.log('Nice! Database looks fine');
}).catch(function (err) {
  console.log(err, 'Something went wrong with the Database Update!');
});
// Add routes, both API and view
app.use(routes);


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

