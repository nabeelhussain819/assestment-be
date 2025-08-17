"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversionHistories = exports.convertCurrency = exports.getCurrencies = void 0;
const currency_service_1 = require("../services/currency.service");
const getCurrencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currencies = yield (0, currency_service_1.getAllCurrencies)();
        res.json(currencies);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching currencies' });
    }
});
exports.getCurrencies = getCurrencies;
const convertCurrency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, amount } = req.body;
        if (!from || !to || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = yield (0, currency_service_1.convertCurrencyAmount)(from, to, amount);
        console.log(result);
        return res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error converting currency' });
    }
});
exports.convertCurrency = convertCurrency;
const getConversionHistories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield (0, currency_service_1.getConversionHistory)();
        return res.json(history);
    }
    catch (error) {
        console.error('Error fetching history:', error);
        return res.status(500).json({ message: 'Error fetching history' });
    }
});
exports.getConversionHistories = getConversionHistories;
