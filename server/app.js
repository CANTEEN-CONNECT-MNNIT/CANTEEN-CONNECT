import express from 'express';
import morgan from 'morgan';
import authroute from './router/authrouter.js';
import itemroute from './router/fooditemrouter.js';
import canteenroute from './router/canteenrouter.js';
import globalerrorhandler from './controller/errorcontroller.js';
import { protect } from './controller/authcontroller.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api/auth', authroute);
app.use(protect);
app.use('/api/item', itemroute);
app.use('/api/canteen', canteenroute);
app.use(globalerrorhandler);
export default app;
