const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const checkToken = require('./routes/check');
const currencyRoutes = require('./routes/currency');
const keys = require('./config/keys');
const app = express();
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// mongoo connect
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));
//dev
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
// app.use(cors());
app.use(cookieParser('some text'));

app.use('/auth', authRoutes);
app.use('/currency', currencyRoutes);
app.use('/checkToken', checkToken);
module.exports = app;