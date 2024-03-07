"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashedPassword = async (inputtedText) => {
    const saltRound = 12;
    return await bcrypt_1.default.hash(inputtedText, saltRound);
};
exports.hashedPassword = hashedPassword;
const comparePasswords = async (inputtedText, hashedPassword) => {
    return await bcrypt_1.default.compare(inputtedText, hashedPassword);
};
exports.comparePasswords = comparePasswords;
