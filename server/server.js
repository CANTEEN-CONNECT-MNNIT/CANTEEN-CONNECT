import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// const port = 6000;
const port = process.env.PORT || 8000;

// console.log(process.env.CONN_STR);

mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log('Created database succesfully');
  })
  .catch((error) => {
    console.log(`DB Cconnection failed due to ${error}`);
  });

app.get('/', (req, res) => {
  res.send('WELCOME TO MY CANTEEN CONNNECT SITE');
});

app.listen(port, () => {
  console.log(`Server is created succesfully and run on the port ${port}`);
});
