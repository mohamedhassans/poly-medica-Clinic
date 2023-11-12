import express from 'express';
import morgan from 'morgan';
import {payment} from './src/api/PaymentAPI.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002', 'http://localhost:3005'],
	credentials: true
}));

payment(app);

export default app;



