import { Request, Response } from 'express';
import { getAllCurrencies, convertCurrencyAmount,  getConversionHistory  } from '../services/currency.service';

export const getCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await getAllCurrencies();
     res.json(currencies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching currencies' });
  }
};

export const convertCurrency = async (req: Request, res: Response) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await convertCurrencyAmount(from, to, amount);
    console.log(result)
    
    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error converting currency' });
  }
};

export const getConversionHistories = async (req: Request, res: Response) => {
  try {
    const history = await getConversionHistory();
    return res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    return res.status(500).json({ message: 'Error fetching history' });
  }
};