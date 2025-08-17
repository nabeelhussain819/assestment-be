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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversionHistory = exports.convertCurrencyAmount = exports.getAllCurrencies = void 0;
const axios_1 = __importDefault(require("axios"));
const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';
let conversionHistory = [];
const getAllCurrencies = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${BASE_URL}/currencies`, {
        params: {
            apikey: API_KEY
        }
    });
    return response.data.data;
});
exports.getAllCurrencies = getAllCurrencies;
const convertCurrencyAmount = (from, to, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${BASE_URL}/latest`, {
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
});
exports.convertCurrencyAmount = convertCurrencyAmount;
const getConversionHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    return conversionHistory;
});
exports.getConversionHistory = getConversionHistory;
