"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUIDv4 = exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateRandomString = (length) => {
    return Array.from(crypto_1.default.randomFillSync(new Uint8Array(length))).map((n) => chars[n % chars.length]).join('');
};
exports.generateRandomString = generateRandomString;
const generateUUIDv4 = () => {
    return crypto_1.default.randomUUID();
};
exports.generateUUIDv4 = generateUUIDv4;
