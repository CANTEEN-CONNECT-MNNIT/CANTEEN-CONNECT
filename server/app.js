import express from 'express';
import morgan from 'morgan';
import authroute from './router/authrouter.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api/auth', authroute);

export default app;
