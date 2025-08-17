import axios from 'axios';

const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

interface ConversionResult {
  convertedAmount: number;
  rate: number;
}

interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  date: string;
}

let conversionHistory: ConversionRecord[] = [];

export const getAllCurrencies = async () => {
  const response = await axios.get(`${BASE_URL}/currencies`, {
    params: {
      apikey: API_KEY
    }
  });
  return response.data.data;
};

export const convertCurrencyAmount = async (from: string, to: string, amount: number): Promise<ConversionResult> => {
  const response = await axios.get(`${BASE_URL}/latest`, {
    params: {
      apikey: API_KEY,
      base_currency: from,
      currencies: to
    }
  });
  
  const rate = response.data.data[to];
  const convertedAmount = amount * rate;
  
  conversionHistory.unshift({
    from,
    to,
    amount,
    convertedAmount,
    date: new Date().toISOString()
  });
  
  conversionHistory = conversionHistory.slice(0, 20);
  
  return {
    convertedAmount,
    rate
  };
};

export const getConversionHistory = async () => {
  return conversionHistory;
};