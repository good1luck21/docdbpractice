const mongoose = require('mongoose');
const fs = require('fs');

const uri = process.env.DB_HOST;
// ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&
const conn = mongoose.connect(uri, {
  // ssl: true,
  // sslValidate: false,
  // sslCA: fs.readFileSync(`${__dirname}/rds-combined-ca-bundle.pem`),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
  user: process.env.USER_NAME,
  pass: process.env.PASS,
  dbName: process.env.DB_NAME
});
// console.log(`${__dirname}/rds-combined-ca-bundle.pem`)
mongoose.set('strictQuery', true);

module.exports = conn;