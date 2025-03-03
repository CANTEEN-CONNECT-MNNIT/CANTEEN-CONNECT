import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './controller/authcontroller.js';
import authroute from './router/authrouter.js';
import itemroute from './router/fooditemrouter.js';
import canteenroute from './router/canteenrouter.js';
import globalerrorhandler from './controller/errorcontroller.js';
import cartrouter from './router/cartrouter.js';
import userroute from './router/userrouter.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import orderroute from './router/orderroute.js';
import paymentroute from './router/paymentrouter.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    sameSite: 'Lax',
  })
);

app.use(morgan('dev'));

app.use('/api/auth', authroute);
app.use(protect);
app.use('/api/user', userroute);
app.use('/api/item', itemroute);
app.use('/api/cart', cartrouter);
app.use('/api/order', orderroute);
app.use('/api/payment', paymentroute);
app.use('/api/canteen', canteenroute);
app.use(globalerrorhandler);

export default app;
