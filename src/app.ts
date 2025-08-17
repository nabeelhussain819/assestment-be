import express from 'express';
import cors from 'cors';
import currencyRoutes from './routes/currency.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/currency', currencyRoutes);

export default app;