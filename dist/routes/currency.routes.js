"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_controller_1 = require("../controllers/currency.controller");
const router = (0, express_1.Router)();
router.get('/currencies', currency_controller_1.getCurrencies);
router.post('/convert', currency_controller_1.convertCurrency);
router.get('/history', currency_controller_1.getConversionHistories);
exports.default = router;
