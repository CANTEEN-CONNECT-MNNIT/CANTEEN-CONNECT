import express from 'express';
import morgan from 'morgan';
import authroute from './router/authrouter.js';
import itemroute from './router/fooditemrouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api/auth', authroute);
app.use('/api/item', itemroute);
export default app;
