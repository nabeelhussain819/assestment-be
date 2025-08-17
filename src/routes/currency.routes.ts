import { Router } from 'express';
import { getCurrencies, convertCurrency, getConversionHistories } from '../controllers/currency.controller';

const router = Router();

router.get('/currencies', getCurrencies);
router.post('/convert', convertCurrency);
router.get('/history', getConversionHistories);

export default router;