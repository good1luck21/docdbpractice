require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const conn = require('./configs/db');



const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/users', userRoutes);

app.listen(5555, () => {
  console.log(conn);
  console.log('Server is running on port 5555');
  console.log(__dirname);
});
