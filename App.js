import express from 'express';
import {config} from 'dotenv';
import router from './routes/paymentRoutes.js';
config({path: './config/config.env'});

export const App = express();


App.use('/api', router);
